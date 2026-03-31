import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Submission } from '@/lib/models/Submission';
import { getUserFromToken } from '@/lib/auth';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { status, proofText, proofUrl, feedback } = await req.json();

    const submission = await Submission.findById(params.id);
    if (!submission) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

    // Users can only update their own submissions unless they are admin
    // (though for work submission, they only update if status is 'approved_to_start')
    if (submission.userId.toString() !== (user as any).id) {
       // Check if user is admin (optional, handled in admin API usually)
       return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (status) submission.status = status;
    if (proofText) submission.proofText = proofText;
    if (proofUrl) submission.proofUrl = proofUrl;
    if (feedback) submission.feedback = feedback;

    await submission.save();
    return NextResponse.json(submission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const submission = await Submission.findById(params.id).populate('opportunityId');
    if (!submission) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    return NextResponse.json(submission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
