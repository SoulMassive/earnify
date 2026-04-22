const mongoose = require('mongoose');
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

async function listUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const UserSchema = new mongoose.Schema({ email: String, role: String, name: String }, { strict: false });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const users = await User.find({}, 'name email role');
    console.log('--- ALL USERS ---');
    users.forEach(u =\u003e console.log(`${u.name} (${u.email}) - Role: ${u.role}`));
    console.log('-----------------');
  } catch (err) {
    console.error('Error listing users:', err);
  } finally {
    process.exit(0);
  }
}

listUsers();
