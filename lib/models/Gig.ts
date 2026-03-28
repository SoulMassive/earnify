import mongoose from 'mongoose';

const GigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title.'],
    maxlength: [100, 'Title cannot be more than 100 characters.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  payout: {
    type: Number,
    required: [true, 'Please provide a payout amount.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
    enum: ['marketing', 'writing', 'development', 'design', 'data', 'video', 'tutoring', 'social'],
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert'],
    default: 'Beginner',
  },
  deadline: {
    type: String, // e.g., "2 days"
    required: [true, 'Please provide a deadline.'],
  },
  tags: [String],
  requirements: [String],
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'Closed', 'Paused'],
  },
  createdByAdmin: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

export const Gig = mongoose.models.Gig || mongoose.model('Gig', GigSchema);
