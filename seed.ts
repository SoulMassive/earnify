import connectDB from './lib/db';
import { User } from './lib/models/User';
import { Opportunity } from './lib/models/Opportunity';
import bcrypt from 'bcryptjs';

const seedData = async () => {
  try {
    await connectDB();
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Opportunity.deleteMany({});

    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const users = await User.create([
      { name: 'Alex Rivera', email: 'alex@earnify.io', password: hashedPassword, points: 15420, balance: 2450.50, rank: 'Platinum', completedTasks: 124 },
      { name: 'Sarah Chen', email: 'sarah@earnify.io', password: hashedPassword, points: 12850, balance: 1840.20, rank: 'Gold', completedTasks: 98 },
      { name: 'Marcus Bell', email: 'marcus@earnify.io', password: hashedPassword, points: 9640, balance: 1210.00, rank: 'Silver', completedTasks: 76 },
      { name: 'Elena Petrova', email: 'elena@earnify.io', password: hashedPassword, points: 8420, balance: 945.80, rank: 'Silver', completedTasks: 62 },
      { name: 'James Wilson', email: 'james@earnify.io', password: hashedPassword, points: 7150, balance: 820.40, rank: 'Bronze', completedTasks: 45 },
    ]);

    console.log('Seeding opportunities...');
    await Opportunity.create([
      { 
        title: 'React Dashboard UI', 
        description: 'Design and implement a responsive dashboard using React and Tailwind.', 
        reward: 450, 
        category: 'Development', 
        type: 'Task',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400'
      },
      { 
        title: 'Brand Identity Design', 
        description: 'Create a modern logo and brand guidelines for a fintech startup.', 
        reward: 600, 
        category: 'Design', 
        type: 'Job',
        image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde7?auto=format&fit=crop&q=80&w=400'
      },
      { 
        title: 'Market Research Survey', 
        description: 'Participate in a 30-minute survey about payment processing trends.', 
        reward: 25, 
        category: 'Marketing', 
        type: 'Survey',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400'
      },
      { 
        title: 'API Documentation Writer', 
        description: 'Write clear and concise documentation for our public payment API.', 
        reward: 350, 
        category: 'Writing', 
        type: 'Task',
        image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=400'
      },
    ]);

    console.log('Seeding page content...');
    const { Testimonial, Benefit } = await import('./lib/models/PageContent');
    
    await Testimonial.deleteMany({});
    await Benefit.deleteMany({});

    await Testimonial.create([
      { name: "Kavya Desai", role: "IIT Delhi", college: "IIT Delhi", avatar: "9", content: "Earnify helped me fund my own project within just 2 months. The affiliate tasks are super easy to pick up!", rating: 5 },
      { name: "Arjun Menon", role: "NIT Trichy", college: "NIT Trichy", avatar: "14", content: "Best platform for students. I made Rs. 15,000 last month doing micro-tasks. Highly recommend it to everyone.", rating: 5 },
      { name: "Sneha Iyer", role: "BITS Pilani", college: "BITS Pilani", avatar: "21", content: "I started with zero skills and now earn weekly. Earnify is genuinely the best platform for students.", rating: 5 },
    ]);

    await Benefit.create([
      { title: "Sign Up Free", description: "Create your student profile in minutes. Verify your college email and set up your skills.", icon: "UserPlus", order: 1 },
      { title: "Pick Opportunities", description: "Browse affiliate programs, freelance gigs, or micro-tasks that fit your schedule.", icon: "Search", order: 2 },
      { title: "Track & Withdraw", description: "Monitor your earnings in real-time and withdraw anytime to your bank or UPI.", icon: "Wallet", order: 3 },
    ]);



    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
