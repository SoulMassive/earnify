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


const SiteSettingsSchema = new mongoose.Schema({
  heroHeadline: String,
  heroSubheadline: String,
  totalStudentsEarning: Number,
  totalPaidOut: Number,
  totalOpportunities: Number,
  popularSearches: [String],
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
export const Benefit = mongoose.models.Benefit || mongoose.model('Benefit', BenefitSchema);

export const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
