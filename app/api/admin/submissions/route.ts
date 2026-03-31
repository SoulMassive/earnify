import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Submission } from '@/lib/models/Submission';
import { User } from '@/lib/models/User';
import { isAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const submissions = await Submission.find({})
      .populate('userId', 'name email balance points')
      .populate('opportunityId', 'title category reward')
      .sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    await connectDB();
    const { id, status, feedback } = await req.json();

    if (status === 'rejected' && !feedback?.trim()) {
      return NextResponse.json({ error: 'Feedback is required when rejecting a submission' }, { status: 400 });
    }

    const submission = await Submission.findById(id);
    if (!submission) return NextResponse.json({ error: 'Submission not found' }, { status: 404 });

    // Block re-processing already-approved submissions
    if (submission.status === 'approved') {
      return NextResponse.json({ error: 'Submission already approved and paid out' }, { status: 400 });
    }

    // Only pay out on submissions that have actual work
    if (status === 'approved') {
      if (submission.status !== 'submitted') {
        return NextResponse.json({ error: 'Can only approve submissions that have submitted work' }, { status: 400 });
      }
      const user = await User.findById(submission.userId);
      if (user) {
        user.balance += submission.reward || 0;
        user.totalEarned += submission.reward || 0;
        user.completedTasks += 1;
        user.points += 50;
        await user.save();
      }
    }

    submission.status = status;
    submission.feedback = feedback || '';
    submission.reviewedAt = new Date();
    await submission.save();

    return NextResponse.json(submission);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
