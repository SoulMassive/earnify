import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Testimonial, Benefit, LiveSession } from '@/lib/models/PageContent';

export async function GET() {
  try {
    await connectDB();
    const [testimonials, benefits, liveSessions] = await Promise.all([
      Testimonial.find({}),
      Benefit.find({}).sort({ order: 1 }),
      LiveSession.find({}),
    ]);

    return NextResponse.json({
      testimonials,
      benefits,
      liveSessions,
    });
  } catch (error: any) {
    console.error('Page content error:', error);
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}
