import mongoose from 'mongoose';

const SubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide a userId.'],
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: [true, 'Please provide an opportunityId.'],
  },
  // Work proof fields
  workLink: {
    type: String,
    default: '',
  },
  fileUrl: {
    type: String,
    default: '',
  },
  fileName: {
    type: String,
    default: '',
  },
  fileSize: {
    type: Number,
    default: 0,
  },
  message: {
    type: String,
    default: '',
  },
  // Legacy fields (keep for compatibility)
  proofText: { type: String, default: '' },
  proofUrl:  { type: String, default: '' },
  links: [String],
  // Status pipeline
  status: {
    type: String,
    enum: ['applied', 'submitted', 'approved', 'rejected'],
    default: 'applied',
  },
  feedback: { type: String, default: '' },
  reward: Number,
  reviewedAt: Date,
}, { timestamps: true });

export const Submission = mongoose.models.Submission || mongoose.model('Submission', SubmissionSchema);

