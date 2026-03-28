import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
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
  fileUrl: {
    type: String,
    required: [true, 'Please provide a fileUrl or submission link.'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  feedback: {
    type: String,
  }
}, { timestamps: true });

export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);
