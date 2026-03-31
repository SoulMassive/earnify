import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { User } from '@/lib/models/User';

// IMPORTANT: Remove or secure this endpoint after setup!
// Access: GET /api/setup-admin?email=your@email.com&secret=earnify-setup-2024
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const secret = searchParams.get('secret');

  if (secret !== 'earnify-setup-2024') {
    return NextResponse.json({ error: 'Invalid secret key' }, { status: 401 });
  }

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        error: `No user found with email: ${email}`,
        hint: 'Register first at /signup, then call this endpoint.'
      }, { status: 404 });
    }

    user.role = 'admin';
    await user.save();

    return NextResponse.json({
      success: true,
      message: `✅ ${user.name} (${email}) is now an admin!`,
      nextSteps: [
        '1. Log out from any active session',
        '2. Log in again with: ' + email,
        '3. Visit: /admin'
      ]
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
