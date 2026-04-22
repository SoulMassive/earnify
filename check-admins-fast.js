const mongoose = require('mongoose');
require('dotenv').config();

async function findAdmins() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    const UserSchema = new mongoose.Schema({ email: String, role: String, name: String }, { strict: false });
    const User = mongoose.models.User || mongoose.model('User', UserSchema);
    const admins = await User.find({ role: 'admin' }, 'email name');
    
    if (admins.length > 0) {
      console.log('--- ADMINS ---');
      admins.forEach(adm =\u003e console.log(`${adm.name} (${adm.email})`));
      console.log('--------------');
    } else {
      console.log('No admins found.');
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
}

findAdmins();
