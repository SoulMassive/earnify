const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
        process.env[key] = value;
      }
    }
  }
  console.log('✅ .env loaded');
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found');
  process.exit(1);
}

const email = process.argv[2];
if (!email) {
  console.error('❌ Usage: node scripts/make-admin.cjs <email>');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'student' },
}, { strict: false });

async function run() {
  try {
    console.log(`🔌 Connecting to MongoDB...`);
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to MongoDB`);

    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const user = await User.findOne({ email });

    if (!user) {
      console.error(`❌ No user found with email: "${email}"`);
      console.log(`   Make sure this user has registered through the signup page first.`);
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`\n🎉 SUCCESS!`);
    console.log(`   Name : ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role : ${user.role}`);
    console.log(`\n📌 Next steps:`);
    console.log(`   1. Log out from the site if already logged in`);
    console.log(`   2. Log back in with: ${email}`);
    console.log(`   3. Visit: http://localhost:3000/admin`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
