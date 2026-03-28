import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Testimonial, Benefit, LiveSession, SiteSettings } from '@/lib/models/PageContent';
import { Category } from '@/lib/models/Category';

export async function GET() {
  try {
    await connectDB();
    const [testimonials, benefits, liveSessions, categories, siteSettings] = await Promise.all([
      Testimonial.find({}),
      Benefit.find({}).sort({ order: 1 }),
      LiveSession.find({}),
      Category.find({}),
      SiteSettings.findOne({}),
    ]);

    return NextResponse.json({
      testimonials,
      benefits,
      liveSessions,
      categories,
      siteSettings,
    });
  } catch (error: any) {
    console.error('Page content error:', error);
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}
