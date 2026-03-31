import mongoose from 'mongoose';
import connectDB from '../lib/db';
import { User } from '../lib/models/User';

async function makeAdmin(email: string) {
  try {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return;
    }
    user.role = 'admin';
    await user.save();
    console.log(`User ${email} is now an admin`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

const email = process.argv[2];
if (!email) {
  console.log('Provide an email');
  process.exit();
}
makeAdmin(email);
