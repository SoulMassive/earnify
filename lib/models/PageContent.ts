import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  content: String,
  avatar: String,
  college: String,
  rating: { type: Number, default: 5 },
});

const BenefitSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String, // lucide icon name
  order: Number,
});

const LiveSessionSchema = new mongoose.Schema({
  title: String,
  instructor: String,
  date: Date,
  category: String,
  imageUrl: String,
  spotsRemaining: Number,
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const Benefit = mongoose.models.Benefit || mongoose.model('Benefit', BenefitSchema);
export const LiveSession = mongoose.models.LiveSession || mongoose.model('LiveSession', LiveSessionSchema);
