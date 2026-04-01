import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    const topUsers = await User.find({ role: 'student' })
      .sort({ points: -1 })
      .limit(10)
      .select('name avatar points balance completedTasks totalEarned globalRank');

    return NextResponse.json(topUsers);
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
