import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Conversation } from '@/lib/models/Conversation';
import { Message } from '@/lib/models/Message';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    
    // Use the ID directly, Mongoose will handle casting
    const messages = await Message.find({ conversationId: id }).sort({ createdAt: 1 });
    
    // Defensive check for user role
    const role = (user as any).role || 'student';
    
    try {
      // Mark as read asynchronously - don't let it block the main response if it fails
      const receiverRole = role === 'admin' ? 'student' : 'admin';
      await Message.updateMany(
        { conversationId: id, senderRole: receiverRole },
        { $set: { readStatus: true } }
      );
      
      await Conversation.findByIdAndUpdate(id, {
        $set: { [`unreadCount.${role === 'admin' ? 'admin' : 'student'}`]: 0 }
      });
    } catch (updateErr) {
      console.error('Failed to update read status:', updateErr);
    }

    return NextResponse.json(messages);
  } catch (err: any) {
    console.error('Messages GET error:', err);
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: any }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    const user = await getUserFromToken();
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { messageText, attachments, fileUrl, workLink } = await req.json();

    const role = (user as any).role || 'student';

    const newMessage = await Message.create({
      conversationId: id,
      senderId: (user as any).id,
      senderRole: role === 'admin' ? 'admin' : 'student',
      messageText: messageText || '',
      fileUrl: fileUrl || null,
      workLink: workLink || null,
      attachments: attachments || []
    });

    try {
      // Update conversation metadata
      const updateObj: any = {
        $set: { lastMessage: messageText || 'Attachment sent', lastMessageAt: new Date() },
        $inc: { [`unreadCount.${role === 'admin' ? 'student' : 'admin'}`]: 1 }
      };
      
      await Conversation.findByIdAndUpdate(id, updateObj);
    } catch (updateErr) {
      console.error('Failed to update conversation metadata:', updateErr);
    }

    return NextResponse.json(newMessage);
  } catch (err: any) {
    console.error('Messages POST error:', err);
    return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
  }
}
