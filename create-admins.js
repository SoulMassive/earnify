const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Load .env file
const envPath = path.join(__dirname, '.env');
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
}

async function createAdmins() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');

    const UserSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, default: 'student' },
      status: { type: String, default: 'active' }
    }, { timestamps: true });

    const User = mongoose.models.User || mongoose.model('User', UserSchema);

    const adminsToAdd = [
      { 
        name: 'Admin One', 
        email: 'admin1@earnify.io', 
        password: await bcrypt.hash('Admin123!', 12), 
        role: 'admin' 
      },
      { 
        name: 'Admin Two', 
        email: 'admin2@earnify.io', 
        password: await bcrypt.hash('Admin2123!', 12), 
        role: 'admin' 
      }
    ];

    for (const a of adminsToAdd) {
      const existing = await User.findOne({ email: a.email });
      if (existing) {
        existing.role = 'admin';
        existing.password = a.password; // Also update password if existing
        await existing.save();
        console.log(`Updated existing user to admin with new password: ${a.email}`);
      } else {
        await User.create(a);
        console.log(`Created new admin: ${a.email}`);
      }
    }

    console.log('\n--- Admin Credentials Created ---');
    console.log('1. Email: admin1@earnify.io | Password: Admin123!');
    console.log('2. Email: admin2@earnify.io | Password: Admin2123!');
    console.log('---------------------------------');

  } catch (err) {
    console.error('Error creating admins:', err);
  } finally {
    process.exit(0);
  }
}

createAdmins();
