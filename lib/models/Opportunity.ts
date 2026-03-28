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
    enum: ['Development', 'Design', 'Marketing', 'Writing', 'Data', 'Other'],
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
}, { timestamps: true });

export const Opportunity = mongoose.models.Opportunity || mongoose.model('Opportunity', OpportunitySchema);
