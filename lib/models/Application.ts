import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a userId.'],
  },
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: [true, 'Please provide a gigId.'],
  },
  status: {
    type: String,
    enum: ['applied', 'approved', 'rejected'],
    default: 'applied',
  },
}, { timestamps: true });

export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
