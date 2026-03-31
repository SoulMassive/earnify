import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/db';
import { Opportunity } from '@/lib/models/Opportunity';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const categoryQuery = searchParams.get('category');
    
    let filter: any = { status: 'Open' };
    if (categoryQuery) {
      // Case-insensitive search
      filter.category = { $regex: new RegExp(`^${categoryQuery}$`, 'i') };
    }

    const opportunities = await Opportunity.find(filter).sort({ createdAt: -1 });
    
    return NextResponse.json(opportunities);
  } catch (error: any) {
    console.error('Opportunities error:', error);
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const newOpportunity = await Opportunity.create(data);
    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error: any) {
    console.error('Create opportunity error:', error);
    return NextResponse.json({ error: 'Failed to create opportunity' }, { status: 500 });
  }
}
