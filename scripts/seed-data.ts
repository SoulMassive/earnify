const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/earnify';

// Define schemas inline to avoid import issues
const LearningResourceSchema = new mongoose.Schema({
  title: String,
  type: String,
  duration: String,
});

const CategorySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  potential: String,
  description: String,
  avgIncome: String,
  demandLevel: String,
  successRate: String,
  features: [String],
  skillLevels: [String],
  tags: [String],
  learningResources: [LearningResourceSchema],
});

const GigSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  payout: { type: Number, required: true },
  category: { type: String, required: true },
  difficulty: { type: String },
  deadline: { type: String },
  tags: [String],
  company: String,
  status: { type: String, default: 'Open' },
});

const TestimonialSchema = new mongoose.Schema({
  name: String, role: String, content: String, avatar: String, college: String, rating: { type: Number, default: 5 }
});

const BenefitSchema = new mongoose.Schema({
  title: String, description: String, icon: String, order: Number
});


const SiteSettingsSchema = new mongoose.Schema({
  heroHeadline: String, heroSubheadline: String, totalStudentsEarning: Number, totalPaidOut: Number, totalOpportunities: Number, popularSearches: [String]
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Gig = mongoose.models.Gig || mongoose.model('Gig', GigSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
const Benefit = mongoose.models.Benefit || mongoose.model('Benefit', BenefitSchema);
const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);

// Data from lib/data/categories.ts (Hardcoded here for the script to be standalone)
const categoryHubs = {
  'marketing': {
    title: 'Affiliate Marketing',
    potential: '₹15,000–₹60,000/month',
    description: 'Promote top brands and earn commissions. No local limits on your reach.',
    avgIncome: '₹12k - ₹45k', demandLevel: 'High', successRate: '92%',
    features: ['Referral Links', 'Click Tracking', 'Conversion Analytics'],
    skillLevels: ['Beginner', 'Intermediate', 'Expert'], tags: ['E-Commerce', 'SaaS', 'Finance'],
    learningResources: [
      { title: 'The Winning WhatsApp Funnel', type: 'Guide', duration: '12 mins' },
      { title: 'Mastering Facebook Ad Copy', type: 'Video', duration: '25 mins' },
      { title: 'Copy-Paste High Converters', type: 'Templates', duration: '5 mins' },
    ],
    gigs: [
      { id: 'aff-1', title: 'Promote AmazePay App', payout: 50, deadline: 'Unlimited', difficulty: 'Beginner', company: 'AmazePay', tags: ['App', 'Finance'] },
      { id: 'aff-2', title: 'TrendStyle Fashion Influencer', payout: 1500, deadline: '30 days', difficulty: 'Intermediate', company: 'TrendStyle', tags: ['Fashion', 'Influencer'] },
    ]
  },
  'writing': {
    title: 'Content Writing Hub',
    potential: '₹10,000–₹50,000/month',
    description: 'Build your writing portfolio with real-world gigs across blogs, tech documents, and social media.',
    avgIncome: '₹10k - ₹35k', demandLevel: 'High', successRate: '88%',
    features: ['Portfolio Builder', 'AI Content Suggestions', 'Word Count Tracker'],
    skillLevels: ['Beginner', 'College Level', 'Pro Copywriter'], tags: ['Blogs', 'Academic', 'Copywriting'],
    learningResources: [
      { title: 'Instagram Caption Cheat Sheet', type: 'Templates', duration: '10 mins' },
      { title: 'SEO Blog Writing Masterclass', type: 'Course', duration: '45 mins' },
    ],
    gigs: [
      { id: 'wr-1', title: 'Write 10 Instagram Captions', payout: 1200, deadline: '2 days', difficulty: 'Beginner', company: 'SocialPulse', tags: ['Social Media'] },
    ]
  },
  'development': {
    title: 'Coding & Dev Hub',
    potential: '₹25,000–₹1.2L/month',
    description: 'Solve real bugs, build custom scripts, and contribute to active GitHub repositories.',
    avgIncome: '₹45k - ₹90k', demandLevel: 'Very High', successRate: '85%',
    features: ['Project-Based Gigs', 'GitHub Hub', 'Code Tests'],
    skillLevels: ['Junior', 'Intermediate', 'Senior'], tags: ['React', 'Node.js', 'Python'],
    learningResources: [
      { title: 'Clean Code in Next.js', type: 'Guide', duration: '30 mins' },
    ],
    gigs: [
      { id: 'dev-1', title: 'Feature Fix: React Dashboard', payout: 8500, deadline: '3 days', difficulty: 'Intermediate', company: 'StartUpX', tags: ['React', 'CSS'] },
    ]
  },
  'design': {
    title: 'Graphic Design Studio',
    potential: '₹12,000–₹80,000/month',
    description: 'Design brand identities, website layouts, and social creative sets for real companies.',
    avgIncome: '₹20k - ₹50k', demandLevel: 'High', successRate: '90%',
    features: ['Image Upload & Preview', 'Client Feedback Hub'],
    skillLevels: ['Beginner', 'Intermediate'], tags: ['UI/UX', 'Logos'],
    learningResources: [
      { title: 'Choosing the Perfect Typography', type: 'Video', duration: '15 mins' },
    ],
    gigs: [
      { id: 'des-1', title: 'Social Media Post Set (10)', payout: 2500, deadline: '2 days', difficulty: 'Beginner', company: 'AdSet', tags: ['Social', 'Graphics'] },
    ]
  }
};

const landingData = {
  testimonials: [
    { name: 'Rahul S.', role: 'Content Writer', college: 'IIT Delhi', content: 'Earnify helped me land my first freelancing gig while still in college. The payout was instant!', rating: 5 },
    { name: 'Priya M.', role: 'Graphic Designer', college: 'NID', content: 'The portfolio builder is a game changer. I showed my Earnify projects to a real client and got hired.', rating: 5 },
    { name: 'Ankit K.', role: 'Developer', college: 'BITS Pilani', content: 'Best platform for student devs. The tasks are challenging and the community is super helpful.', rating: 5 },
  ],
  benefits: [
    { title: 'Setup Your Profile', description: 'Fill in your details and select your skills to unlock personalized opportunities.', icon: 'UserPlus', order: 1 },
    { title: 'Find Opportunities', description: 'Browse and apply to vetted gigs, micro-tasks, and affiliate deals from top brands.', icon: 'Search', order: 2 },
    { title: 'Get Paid Instantly', description: 'Complete tasks and get your earnings transferred directly to your secure wallet.', icon: 'Wallet', order: 3 },
  ],

  siteSettings: {
    heroHeadline: 'Turn Your Free Hours Into Real Income',
    heroSubheadline: 'Earnify connects college students with affiliate deals, freelance gigs, and micro-tasks — built around your schedule.',
    totalStudentsEarning: 12400,
    totalPaidOut: 3.4,
    totalOpportunities: 870,
    popularSearches: ['Amazon Affiliate', 'Content Writing', 'Canva Gigs', 'Tutoring'],
  }
};

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    // Clear existing data
    await Promise.all([
      Category.deleteMany({}),
      Gig.deleteMany({}),
      Testimonial.deleteMany({}),
      Benefit.deleteMany({}),
      SiteSettings.deleteMany({}),
    ]);
    console.log('Cleaned old data.');

    // Seed Categories and Gigs
    for (const [slug, data] of Object.entries(categoryHubs)) {
      await Category.create({
        slug,
        title: data.title,
        potential: data.potential,
        description: data.description,
        avgIncome: data.avgIncome,
        demandLevel: data.demandLevel,
        successRate: data.successRate,
        features: data.features,
        skillLevels: data.skillLevels,
        tags: data.tags,
        learningResources: data.learningResources,
      });

      for (const gig of data.gigs) {
        await Gig.create({
          title: gig.title,
          category: slug,
          payout: gig.payout,
          deadline: gig.deadline,
          difficulty: gig.difficulty,
          company: gig.company,
          tags: gig.tags,
        });
      }
    }
    console.log('Seeded Categories and Gigs.');

    // Seed Landing Data
    await Testimonial.insertMany(landingData.testimonials);
    await Benefit.insertMany(landingData.benefits);
    await SiteSettings.create(landingData.siteSettings);
    console.log('Seeded Landing Data.');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
