import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { SystemSettings } from '@/lib/models/SystemSettings';

export async function GET() {
  try {
    await connectDB();
    let settings = await SystemSettings.findOne();
    if (!settings) {
      settings = await SystemSettings.create({
        marketplaceEnabled: true,
        autoSubmissionEnabled: false
      });
    } else {
      settings.marketplaceEnabled = true;
      await settings.save();
    }
    return NextResponse.json({ success: true, settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
