import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Payout } from '@/lib/models/Payout';
import { User } from '@/lib/models/User';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const payouts = await Payout.find({}).populate('userId', 'name email balance points').sort({ requestedAt: -1 });
    return NextResponse.json(payouts);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const { id, status, transactionId, feedback } = await req.json();

    const payout = await Payout.findById(id);
    if (!payout) return NextResponse.json({ error: 'Payout request not found' }, { status: 404 });

    if (payout.status !== 'pending') {
      return NextResponse.json({ error: 'Payout already processed' }, { status: 400 });
    }

    if (status === 'processed') {
       payout.processedAt = new Date();
    }

    payout.status = status;
    payout.transactionId = transactionId;
    payout.feedback = feedback;
    await payout.save();

    return NextResponse.json(payout);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
