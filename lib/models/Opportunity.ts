import mongoose from 'mongoose';

const OpportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title.'],
    maxlength: [100, 'Title cannot be more than 100 characters.'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description.'],
  },
  reward: {
    type: Number,
    required: [true, 'Please provide a reward amount.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
    enum: {
      values: ['development', 'design', 'marketing', 'writing', 'data', 'video', 'tutoring', 'social', 'Other'],
      message: '{VALUE} is not a supported category'
    },
    lowercase: true,
  },
  status: {
    type: String,
    default: 'Open',
    enum: ['Open', 'Closed', 'Paused'],
  },
  type: {
    type: String,
    enum: ['Task', 'Job', 'Survey'],
  },
  image: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  requirements: [String],
  deliverables: [String],
  spotsTotal: {
    type: Number,
    default: 10,
  },
  spotsTaken: {
    type: Number,
    default: 0,
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Expert'],
    default: 'Beginner',
  },
}, { timestamps: true });

export const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', OpportunitySchema);
