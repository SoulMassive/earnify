export const categoryHubs = {
  'marketing': {
    title: 'Affiliate Marketing',
    potential: '₹15,000–₹60,000/month',
    description: 'Promote top brands and earn commissions. No local limits on your reach.',
    avgIncome: '₹12k - ₹45k',
    demandLevel: 'High',
    successRate: '92%',
    features: ['Referral Links', 'Click Tracking', 'Conversion Analytics'],
    skillLevels: ['Beginner', 'Intermediate', 'Expert'],
    tags: ['E-Commerce', 'SaaS', 'Finance'],
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
    avgIncome: '₹10k - ₹35k',
    demandLevel: 'High',
    successRate: '88%',
    features: ['Portfolio Builder', 'AI Content Suggestions', 'Word Count Tracker'],
    skillLevels: ['Beginner', 'College Level', 'Pro Copywriter'],
    tags: ['Blogs', 'Academic', 'Copywriting'],
    learningResources: [
      { title: 'Instagram Caption Cheat Sheet', type: 'Templates', duration: '10 mins' },
      { title: 'SEO Blog Writing Masterclass', type: 'Course', duration: '45 mins' },
      { title: 'Portfolio Best Practices', type: 'Guide', duration: '15 mins' },
    ],
    gigs: [
      { id: 'wr-1', title: 'Write 10 Instagram Captions', payout: 1200, deadline: '2 days', difficulty: 'Beginner', company: 'SocialPulse', tags: ['Social Media'] },
      { id: 'wr-2', title: 'Technical Documentation Draft', payout: 5000, deadline: '5 days', difficulty: 'Expert', company: 'SaaSFlow', tags: ['Technical'] },
    ]
  },
  'development': {
    title: 'Coding & Dev Hub',
    potential: '₹25,000–₹1.2L/month',
    description: 'Solve real bugs, build custom scripts, and contribute to active GitHub repositories.',
    avgIncome: '₹45k - ₹90k',
    demandLevel: 'Very High',
    successRate: '85%',
    features: ['Project-Based Gigs', 'GitHub Hub', 'Code Tests'],
    skillLevels: ['Junior', 'Intermediate', 'Senior'],
    tags: ['React', 'Node.js', 'Python'],
    learningResources: [
      { title: 'Clean Code in Next.js', type: 'Guide', duration: '30 mins' },
      { title: 'Building Scalable APIs', type: 'Course', duration: '2 hrs' },
    ],
    gigs: [
      { id: 'dev-1', title: 'Feature Fix: React Dashboard', payout: 8500, deadline: '3 days', difficulty: 'Intermediate', company: 'StartUpX', tags: ['React', 'CSS'] },
      { id: 'dev-2', title: 'API Integration Module', payout: 15000, deadline: '7 days', difficulty: 'Expert', company: 'FinTrack', tags: ['Node.js', 'PostgreSQL'] },
    ]
  },
  'design': {
    title: 'Graphic Design Studio',
    potential: '₹12,000–₹80,000/month',
    description: 'Design brand identities, website layouts, and social creative sets for real companies.',
    avgIncome: '₹20k - ₹50k',
    demandLevel: 'High',
    successRate: '90%',
    features: ['Image Upload & Preview', 'Client Feedback Hub', 'Creative Templates'],
    skillLevels: ['Beginner', 'Intermediate', 'Creative Lead'],
    tags: ['UI/UX', 'Logos', 'Illustrations'],
    learningResources: [
      { title: 'Choosing the Perfect Typography', type: 'Video', duration: '15 mins' },
      { title: 'Figma Auto-Layout Magic', type: 'Templates', duration: '10 mins' },
    ],
    gigs: [
      { id: 'des-1', title: 'Social Media Post Set (10)', payout: 2500, deadline: '2 days', difficulty: 'Beginner', company: 'AdSet', tags: ['Social', 'Graphics'] },
      { id: 'des-2', title: 'Landing Page Prototype', payout: 12000, deadline: '4 days', difficulty: 'Intermediate', company: 'WebStream', tags: ['UI/UX', 'Figma'] },
    ]
  },
  'data': {
    title: 'Data & Virtual Support',
    potential: '₹8,000–₹35,000/month',
    description: 'Handle complex data entry projects, lead investigations, and provide administrative support.',
    avgIncome: '₹10k - ₹25k',
    demandLevel: 'High',
    successRate: '95%',
    features: ['Task Tracker', 'Speed Metrics', 'Inaccuracy Checker'],
    skillLevels: ['Entry', 'Detail-Oriented', 'Project Manager'],
    tags: ['Research', 'Entry', 'Virtual Assistant'],
    learningResources: [
      { title: 'Excel Advanced Shortcuts', type: 'Templates', duration: '20 mins' },
      { title: 'Building CRM Databases', type: 'Guide', duration: '40 mins' },
    ],
    gigs: [
      { id: 'data-1', title: 'Contact Lead Extraction', payout: 2500, deadline: '1 day', difficulty: 'Beginner', company: 'SalesReady', tags: ['Lead Gen'] },
      { id: 'data-2', title: 'Bulk Data Migration (MySQL)', payout: 8000, deadline: '3 days', difficulty: 'Expert', company: 'CloudStore', tags: ['Database'] },
    ]
  },
  'video': {
    title: 'Video & Animation Hub',
    potential: '₹18,000–₹1L/month',
    description: 'Edit highly engaging reels, YouTube content, and motion graphics for influencers and brands.',
    avgIncome: '₹25k - ₹75k',
    demandLevel: 'Very High',
    successRate: '87%',
    features: ['Video Previewer', 'Asset Hub', 'Revision Tracker'],
    skillLevels: ['Editor', 'Colorist', 'VFX Artist'],
    tags: ['Premiere', 'CapCut', 'After Effects'],
    learningResources: [
      { title: 'Viral Hook Editing (Shorts)', type: 'Video', duration: '10 mins' },
      { title: 'Color Grading Masterclass', type: 'Course', duration: '1 hr' },
    ],
    gigs: [
      { id: 'vid-1', title: 'Edit 3 Viral Reels', payout: 4500, deadline: '2 days', difficulty: 'Intermediate', company: 'StreamerOne', tags: ['Reels'] },
      { id: 'vid-2', title: 'Commercial Explainer Video', payout: 25000, deadline: '7 days', difficulty: 'Expert', company: 'SaaSify', tags: ['Animation'] },
    ]
  },
  'tutoring': {
    title: 'Online Tutoring Hub',
    potential: '₹15,000–₹75,000/month',
    description: 'Teach skills or academic subjects. Manage bookings and ratings independently.',
    avgIncome: '₹20k - ₹60k',
    demandLevel: 'High',
    successRate: '94%',
    features: ['Session Booking', 'Student Ratings', 'Scheduling'],
    skillLevels: ['Peer Tutor', 'Certified', 'Expert'],
    tags: ['Academic', 'Skills', 'Language'],
    learningResources: [
      { title: 'Engaging Online Teaching Methods', type: 'Guide', duration: '20 mins' },
      { title: 'Building a Lesson Plan', type: 'Templates', duration: '15 mins' },
    ],
    gigs: [
      { id: 'tut-1', title: '1-on-1 Math Peer Tutoring', payout: 500, deadline: '1 hr', difficulty: 'Beginner', company: 'EduHelp', tags: ['Academic'] },
      { id: 'tut-2', title: 'Group Coding Session', payout: 5000, deadline: '2 hr', difficulty: 'Expert', company: 'CodeSchool', tags: ['Software'] },
    ]
  },
  'social': {
    title: 'Social Media Hub',
    potential: '₹10,000–₹60,000/month',
    description: 'Manage accounts, track campaign performance, and prove social reach with posting proofs.',
    avgIncome: '₹15k - ₹45k',
    demandLevel: 'High',
    successRate: '91%',
    features: ['Campaign Analytics', 'Posting Proof Tracker', 'Ads Manager'],
    skillLevels: ['Beginner', 'Strategist', 'Growth Manager'],
    tags: ['Instagram', 'FB Ads', 'Growth'],
    learningResources: [
      { title: 'Creating High-Converting Ads', type: 'Course', duration: '1.5 hrs' },
      { title: 'Growth Strategies by Platform', type: 'Guide', duration: '25 mins' },
    ],
    gigs: [
      { id: 'soc-1', title: 'Meta Ads Manager (Week 1)', payout: 7500, deadline: '7 days', difficulty: 'Intermediate', company: 'AdExperts', tags: ['Meta Ads'] },
      { id: 'soc-2', title: 'IG Page Growth Specialist', payout: 15000, deadline: '30 days', difficulty: 'Expert', company: 'BrandFocus', tags: ['Strategy'] },
    ]
  }
};

