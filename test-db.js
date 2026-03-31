const mongoose = require('mongoose');
require('dotenv').config();

async function test() {
  try {
    console.log('Connecting to:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected!');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    const CategorySchema = new mongoose.Schema({ title: String });
    const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
    const count = await Category.countDocuments();
    console.log('Category Count:', count);
    process.exit(0);
  } catch (err) {
    console.error('Err:', err);
    process.exit(1);
  }
}
test();
