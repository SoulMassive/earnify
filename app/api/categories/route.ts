import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/db';
import { Category } from '@/lib/models/Category';
import { Opportunity } from '@/lib/models/Opportunity';
import { getUserFromToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ name: 1 });
    return NextResponse.json(categories);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user: any = await getUserFromToken();
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const data = await req.json();
    
    // Auto-generate ID if missing
    if (!data.id) {
       data.id = data.name.toLowerCase().replace(/ /g, '-');
    }

    const category = await Category.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user: any = await getUserFromToken();
    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id, ...data } = await req.json();
    
    const category = await Category.findOneAndUpdate({ _id: id }, data, { new: true });
    if (!category) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    
    return NextResponse.json(category);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const user: any = await getUserFromToken();
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Only superadmins can delete categories' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await connectDB();
    
    // Check if gigs exist in this category
    const catDoc = await Category.findById(id);
    if (catDoc) {
      const gigCount = await Opportunity.countDocuments({ category: catDoc.id });
      if (gigCount > 0) {
        return NextResponse.json({ error: `Cannot delete category: ${gigCount} gigs are currently assigned to it.` }, { status: 400 });
      }
    }

    await Category.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
