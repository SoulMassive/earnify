import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';
import { getUserFromToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const caller: any = await getUserFromToken();
    if (!caller || (caller.role !== 'superadmin' && caller.role !== 'admin')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { name, email, password, role, permissions } = await req.json();

    // Check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.role === 'student') {
        // Upgrade existing student to admin
        existing.role = role || 'admin';
        existing.permissions = permissions || [];
        await existing.save();
        return NextResponse.json({ success: true, message: 'Existing student user upgraded to admin role.', user: existing });
      }
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'admin',
      permissions: permissions || [],
      status: 'active'
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
     const caller: any = await getUserFromToken();
     if (!caller || caller.role !== 'superadmin') {
       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
     }
     await connectDB();
     const admins = await User.find({ role: { $ne: 'student' } }, '-password');
     return NextResponse.json(admins);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
