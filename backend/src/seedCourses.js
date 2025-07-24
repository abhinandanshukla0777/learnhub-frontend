const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/learnhub';

const sampleCourses = [
  {
    title: 'React for Beginners',
    description: 'Learn the basics of React, including components, state, and props.',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  },
  {
    title: 'Data Science 101',
    description: 'An introduction to data science concepts and tools.',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
  {
    title: 'Business Fundamentals',
    description: 'Essential business concepts for entrepreneurs and managers.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
  },
  {
    title: 'UI/UX Design Basics',
    description: 'Learn the principles of user interface and user experience design.',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd',
  },
  {
    title: 'Python Programming',
    description: 'Master Python from scratch and build real-world applications.',
    category: 'Programming',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
  {
    title: 'Machine Learning A-Z',
    description: 'Comprehensive guide to machine learning algorithms and projects.',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'Grow your business with digital marketing strategies.',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  },
  {
    title: 'JavaScript Essentials',
    description: 'Everything you need to know to get started with JavaScript.',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  },
  {
    title: 'Cloud Computing Basics',
    description: 'Understand the fundamentals of cloud computing and services.',
    category: 'IT & Software',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
  },
  {
    title: 'Photography for Beginners',
    description: 'Learn how to take stunning photos with any camera.',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
  },
  {
    title: 'Financial Analysis & Investing',
    description: 'Learn to analyze financial statements and make smart investments.',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290',
  },
  {
    title: 'Android App Development',
    description: 'Build Android apps from scratch using Java and Kotlin.',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    title: 'iOS App Development',
    description: 'Create beautiful iOS apps using Swift and Xcode.',
    category: 'Mobile Development',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
  },
  {
    title: 'Project Management Professional',
    description: 'Prepare for the PMP certification and manage projects efficiently.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99',
  },
  {
    title: 'Excel from Beginner to Advanced',
    description: 'Master Microsoft Excel for business and data analysis.',
    category: 'Productivity',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
  },
  {
    title: 'Ethical Hacking & Cybersecurity',
    description: 'Learn to protect systems and networks from cyber threats.',
    category: 'IT & Software',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  },
  {
    title: 'Public Speaking Masterclass',
    description: 'Become a confident and effective public speaker.',
    category: 'Personal Development',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290',
  },
  {
    title: 'Guitar for Beginners',
    description: 'Start playing guitar with easy-to-follow lessons.',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  },
  {
    title: 'French Language Course',
    description: 'Learn to speak, read, and write in French.',
    category: 'Language',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd',
  },
  {
    title: 'Yoga for Wellness',
    description: 'Improve your health and flexibility with yoga routines.',
    category: 'Health & Fitness',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');

    // Find an instructor to assign to courses, or create one
    let instructor = await User.findOne({ role: 'instructor' });
    if (!instructor) {
      instructor = await User.create({
        name: 'Admin Instructor',
        email: 'instructor@learnhub.com',
        password: 'password123',
        role: 'instructor',
      });
      console.log('Created sample instructor:', instructor.email);
    }

    // Remove existing courses
    await Course.deleteMany({});
    // Insert sample courses
    for (const course of sampleCourses) {
      await Course.create({ ...course, instructor: instructor._id });
    }
    console.log('Sample courses seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed(); 