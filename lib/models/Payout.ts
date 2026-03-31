import mongoose from 'mongoose';

const PayoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['UPI', 'Bank', 'Wallet'],
    default: 'UPI',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'processed'],
    default: 'pending',
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  processedAt: Date,
  transactionId: String,
  feedback: String,
}, { timestamps: true });

export const Payout = mongoose.models.Payout || mongoose.model('Payout', PayoutSchema);
