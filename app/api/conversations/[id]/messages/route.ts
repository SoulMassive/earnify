import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Conversation } from '@/lib/models/Conversation';
import { Message } from '@/lib/models/Message';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    
    const messages = await Message.find({ conversationId: id }).sort({ createdAt: 1 });
    
    // Mark as read if user is receiver
    // More complex logic needed if we want to be precise, but for now mark all as read by current role
    const role = (user as any).role;
    await Message.updateMany(
      { conversationId: id, senderRole: role === 'admin' ? 'student' : 'admin' },
      { $set: { readStatus: true } }
    );
    
    // Reset unread count for current user
    await Conversation.findByIdAndUpdate(id, {
      $set: { [`unreadCount.${role === 'admin' ? 'admin' : 'student'}`]: 0 }
    });

    return NextResponse.json(messages);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { messageText, attachments } = await req.json();

    const role = (user as any).role;
    const newMessage = await Message.create({
      conversationId: id,
      senderId: (user as any).id,
      senderRole: role === 'admin' ? 'admin' : 'student',
      messageText,
      attachments
    });

    // Update conversation metadata
    const updateObj: any = {
      $set: { lastMessage: messageText, lastMessageAt: new Date() },
      $inc: { [`unreadCount.${role === 'admin' ? 'student' : 'admin'}`]: 1 }
    };
    
    await Conversation.findByIdAndUpdate(id, updateObj);

    return NextResponse.json(newMessage);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
