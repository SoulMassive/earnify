import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';
import { signToken } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Please provide all fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = signToken({ id: newUser._id, email: newUser.email, role: newUser.role });

    const response = NextResponse.json({ 
      success: true, 
      user: { 
        name: newUser.name, 
        email: newUser.email, 
        _id: newUser._id,
        avatar: newUser.avatar,
        balance: newUser.balance,
        points: newUser.points,
        totalEarned: newUser.totalEarned,
        globalRank: newUser.globalRank,
        completedTasks: newUser.completedTasks,
        college: newUser.college,
        course: newUser.course,
        year: newUser.year,
        role: newUser.role,
        status: newUser.status
      } 
    }, { status: 201 });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 86400 // 1 day
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
