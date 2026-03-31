import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Submission } from '@/lib/models/Submission';
import { Opportunity } from '@/lib/models/Opportunity';
import { getUserFromToken } from '@/lib/auth';

// POST /api/submissions — Initial gig application (creates thread)
export async function POST(req: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { opportunityId } = await req.json();

    const gig = await Opportunity.findById(opportunityId);
    if (!gig) return NextResponse.json({ error: 'Gig not found' }, { status: 404 });

    // Check if already applied
    const existing = await Submission.findOne({ userId: (user as any).id, opportunityId });
    if (existing) return NextResponse.json({ error: 'Already applied for this gig' }, { status: 400 });

    const submission = await Submission.create({
      userId: (user as any).id,
      opportunityId,
      reward: gig.reward,
      status: 'applied'
    });

    // START COMMUNICATION THREAD
    const { Conversation } = await import('@/lib/models/Conversation');
    const { Message } = await import('@/lib/models/Message');

    const conversation = await Conversation.create({
      opportunityId,
      studentId: (user as any).id,
      status: 'Applied',
      lastMessage: `Applied for gig`,
      lastMessageAt: new Date()
    });

    await Message.create({
      conversationId: conversation._id,
      senderId: (user as any).id,
      senderRole: 'student',
      messageText: `I have applied for this gig: "${gig.title}". Looking forward to the next steps!`,
    });

    return NextResponse.json({ success: true, submission, conversationId: conversation._id }, { status: 201 });
  } catch (err: any) {
    console.error('Submission error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET /api/submissions — Student's own submissions
export async function GET(req: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const submissions = await Submission.find({ userId: (user as any).id })
      .populate('opportunityId', 'title category reward description')
      .sort({ createdAt: -1 });
    return NextResponse.json(submissions);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT /api/submissions — Student submits actual work (workLink + optional file)
export async function PUT(req: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { submissionId, workLink, message, fileUrl, fileName, fileSize } = await req.json();

    if (!workLink || !workLink.trim()) {
      return NextResponse.json({ error: 'Work link is required to submit' }, { status: 400 });
    }

    // Basic URL validation
    try { new URL(workLink); } catch {
      return NextResponse.json({ error: 'Please provide a valid URL for the work link' }, { status: 400 });
    }

    const submission = await Submission.findOne({ _id: submissionId, userId: (user as any).id });
    if (!submission) return NextResponse.json({ error: 'Submission not found or unauthorized' }, { status: 404 });

    if (submission.status === 'approved') {
      return NextResponse.json({ error: 'This submission has already been approved' }, { status: 400 });
    }

    submission.workLink = workLink.trim();
    submission.message = message || '';
    submission.fileUrl = fileUrl || '';
    submission.fileName = fileName || '';
    submission.fileSize = fileSize || 0;
    submission.status = 'submitted';
    await submission.save();

    return NextResponse.json({ success: true, submission });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
