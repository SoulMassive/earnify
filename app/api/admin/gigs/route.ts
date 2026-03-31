import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Opportunity } from '@/lib/models/Opportunity';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const gigs = await Opportunity.find({}).sort({ createdAt: -1 });
    return NextResponse.json(gigs);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const data = await req.json();
    const gig = await Opportunity.create(data);
    return NextResponse.json(gig, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const { id, ...updateData } = await req.json();
    const gig = await Opportunity.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(gig);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await Opportunity.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
