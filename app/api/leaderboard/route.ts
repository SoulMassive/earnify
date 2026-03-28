import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';

export async function GET() {
  try {
    await connectDB();
    const topUsers = await User.find({})
      .sort({ points: -1 })
      .limit(10)
      .select('name avatar points balance completedTasks rank');

    return NextResponse.json(topUsers);
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard data' }, { status: 500 });
  }
}
