import mongoose from 'mongoose';

const LearningResourceSchema = new mongoose.Schema({
  title: String,
  type: String, // e.g., 'Guide', 'Video'
  duration: String, // e.g., '12 mins'
});

const CategorySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  potential: String,
  description: String,
  avgIncome: String,
  demandLevel: String,
  successRate: String,
  features: [String],
  skillLevels: [String],
  tags: [String],
  learningResources: [LearningResourceSchema],
}, { timestamps: true });

export const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
