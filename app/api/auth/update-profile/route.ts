import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';
import { getUserFromToken } from '@/lib/auth';

export async function PATCH(req: Request) {
  try {
    await connectDB();
    const userPayload = await getUserFromToken();

    if (!userPayload || typeof userPayload === 'string') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, college } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      userPayload.id,
      { name, college },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        _id: updatedUser._id,
        avatar: updatedUser.avatar,
        balance: updatedUser.balance,
        points: updatedUser.points,
        totalEarned: updatedUser.totalEarned,
        globalRank: updatedUser.globalRank,
        completedTasks: updatedUser.completedTasks,
        college: updatedUser.college,
        course: updatedUser.course,
        year: updatedUser.year
      }
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
