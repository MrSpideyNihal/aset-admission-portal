const mongoose = require('mongoose');

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
  }

  // Connect to MongoDB
  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'pfersb'
  });

  cachedDb = db;
  return db;
}

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['student', 'faculty'] },
  createdAt: { type: Date, default: Date.now }
});

// Define Application Schema
const applicationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  course: { type: String, required: true }, // Chosen B.Tech branch
  plusTwoPercent: { type: Number, required: true },
  entranceScore: { type: Number, required: true },
  category: { type: String, required: true },
  documents: [{ type: String }],
  status: { 
    type: String, 
    enum: ['pending', 'under_review', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  remarks: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError on hot reloads
const User = mongoose.models.User || mongoose.model('User', userSchema);
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

module.exports = {
  connectToDatabase,
  User,
  Application
};
