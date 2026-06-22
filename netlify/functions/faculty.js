const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { connectToDatabase, Application } = require('./utils/db');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'aset_super_secret_jwt_key_2024';

// Database middleware
app.use(async (req, res, next) => {
  console.log(`[API Request] ${req.method} ${req.path}`);
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('[API Database Connection Error]:', error);
    res.status(500).json({ message: 'Database connection error', error: error.message });
  }
});

// Auth middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const router = express.Router();

// Faculty dashboard stats
router.get('/stats', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Access denied: Faculty only' });
    }

    const total = await Application.countDocuments({});
    const pending = await Application.countDocuments({ status: 'pending' });
    const underReview = await Application.countDocuments({ status: 'under_review' });
    const accepted = await Application.countDocuments({ status: 'accepted' });
    const rejected = await Application.countDocuments({ status: 'rejected' });

    res.json({
      total,
      pending: pending + underReview, // Treat under_review as pending, or keep them separate. Let's return them both for detail
      pendingOnly: pending,
      underReviewOnly: underReview,
      accepted,
      rejected
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating stats', error: error.message });
  }
});

// Mount on all routes to match redirects properly
app.use('/.netlify/functions/faculty', router);
app.use('/api/faculty', router);
app.use('/faculty', router);
app.use('/', router);

module.exports.handler = serverless(app);
