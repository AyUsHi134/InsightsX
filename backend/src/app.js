import { connectDB } from './config/db.js';

const start = async () => {
  await connectDB();
  console.log('🚀 Backend bootstrapped');
};

start();
