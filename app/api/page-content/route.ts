import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Testimonial, Benefit, SiteSettings } from '@/lib/models/PageContent';
import { Category } from '@/lib/models/Category';
import { categoryHubs } from '@/lib/data/categories';

export async function GET() {
  try {
    await connectDB();
    let [testimonials, benefits, categories, siteSettings] = await Promise.all([
      Testimonial.find({}),
      Benefit.find({}).sort({ order: 1 }),
      Category.find({}),
      SiteSettings.findOne({}),
    ]);

    // Auto-seed categories if empty
    if (categories.length === 0) {
      const seedData = Object.entries(categoryHubs).map(([slug, data]) => ({
        slug,
        ...data
      }));
      await Category.insertMany(seedData);
      categories = await Category.find({});
    }

    return NextResponse.json({
      testimonials: testimonials.length > 0 ? testimonials : [],
      benefits: benefits.length > 0 ? benefits : [],
      categories: categories.length > 0 ? categories : [],
      siteSettings: siteSettings || {
        heroHeadline: '',
        heroSubheadline: '',
        totalStudentsEarning: 0,
        totalPaidOut: 0,
        totalOpportunities: 0,
        popularSearches: [],
      },
    });
  } catch (error: any) {
    console.error('Page content error:', error);
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}
