import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Conversation } from '@/lib/models/Conversation';
import { Opportunity } from '@/lib/models/Opportunity';
import { User } from '@/lib/models/User';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    
    // If admin, show all active conversations (optionally filter by adminId if we want to assign)
    // If student, show their conversations
    const filter = (user as any).role === 'admin' 
      ? {} 
      : { studentId: (user as any).id };

    const conversations = await Conversation.find(filter)
      .populate('opportunityId', 'title category reward')
      .populate('studentId', 'name email avatar')
      .sort({ lastMessageAt: -1 });

    return NextResponse.json(conversations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
