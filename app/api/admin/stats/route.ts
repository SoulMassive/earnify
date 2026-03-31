import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';
import { Opportunity } from '@/lib/models/Opportunity';
import { Submission } from '@/lib/models/Submission';
import { Payout } from '@/lib/models/Payout';
import { isAdmin } from '@/lib/auth';

export async function GET() {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await connectDB();

    const [totalUsers, activeUsers, totalGigs, pendingSubmissions, pendingPayouts, totalRevenue] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'student', status: 'active' }),
      Opportunity.countDocuments({}),
      Submission.countDocuments({ status: 'pending' }),
      Payout.countDocuments({ status: 'pending' }),
      User.aggregate([{ $group: { _id: null, total: { $sum: "$totalEarned" } } }])
    ]);

    // Fetch activity trends (last 7 days of submissions)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const trendsRaw = await Submission.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      { $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
      }},
      { $sort: { "_id": 1 } }
    ]);

    // Fill in gaps for 0-entry days
    const activityTrends = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const match = trendsRaw.find(t => t._id === dateStr);
      activityTrends.push({
        date: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
        count: match ? match.count : 0
      });
    }

    // Fetch 5 recent submissions
    const recentSubmissions = await Submission.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('userId', 'name email')
      .populate('opportunityId', 'title');

    return NextResponse.json({
      totalUsers,
      activeUsers,
      totalGigs,
      pendingSubmissions,
      pendingPayouts,
      totalRevenue: totalRevenue[0]?.total || 0,
      activityTrends,
      recentSubmissions
    });
  } catch (error: any) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
