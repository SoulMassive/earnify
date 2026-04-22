import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/db';
import { SystemSettings } from '@/lib/models/SystemSettings';
import { getUserFromToken } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    let settings = await SystemSettings.findOne();
    
    if (!settings) {
      settings = await SystemSettings.create({
        marketplaceEnabled: true,
        autoSubmissionEnabled: false
      });
    }

    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const user: any = await getUserFromToken();
    // Only superadmins can change system-wide critical settings
    if (!user || user.role !== 'superadmin') {
      return NextResponse.json({ error: 'Only superadmins can modify system settings' }, { status: 403 });
    }

    await connectDB();
    const data = await req.json();
    
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = new SystemSettings(data);
    } else {
      Object.assign(settings, data);
    }
    
    settings.updatedBy = user.id;
    await settings.save();

    return NextResponse.json(settings);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
