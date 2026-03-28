import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Opportunity } from '@/lib/models/Opportunity';

export async function GET() {
  try {
    await connectDB();
    const opportunities = await Opportunity.find({ status: 'Open' }).sort({ createdAt: -1 });
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
