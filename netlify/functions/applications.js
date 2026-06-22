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
  try {
    await connectToDatabase();
    next();
  } catch (error) {
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

// Submit new application (student only)
router.post('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can submit applications' });
    }

    const existingApp = await Application.findOne({ studentId: req.user.id });
    if (existingApp) {
      return res.status(400).json({ message: 'You have already submitted an application' });
    }

    const {
      studentName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      course,
      plusTwoPercent,
      entranceScore,
      category,
      documents
    } = req.body;

    const application = new Application({
      studentId: req.user.id,
      studentName,
      email,
      phone,
      dateOfBirth,
      gender,
      address,
      course,
      plusTwoPercent: Number(plusTwoPercent),
      entranceScore: Number(entranceScore),
      category,
      documents: documents || []
    });

    await application.save();
    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
});

// Get current student's application (student only)
router.get('/mine', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view their personal application' });
    }

    const application = await Application.findOne({ studentId: req.user.id });
    if (!application) {
      return res.status(404).json({ message: 'No application found for this student' });
    }

    res.json({ application });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving application', error: error.message });
  }
});

// Get all applications (faculty only, supporting search/filter)
router.get('/', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Access denied: Faculty only' });
    }

    const { course, status, category, search } = req.query;
    const query = {};

    if (course) query.course = course;
    if (status) query.status = status;
    if (category) query.category = category;
    if (search) {
      query.studentName = { $regex: search, $options: 'i' };
    }

    const applications = await Application.find(query).sort({ submittedAt: -1 });
    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications', error: error.message });
  }
});

// Get single application by ID (students can get their own, faculty can get any)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const application = await Application.findById(req.targetId || req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (req.user.role !== 'faculty' && application.studentId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ application });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching application', error: error.message });
  }
});

// Update application status & remarks (faculty only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'faculty') {
      return res.status(403).json({ message: 'Access denied: Faculty only' });
    }

    const { status, remarks } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status = status;
    if (remarks !== undefined) {
      application.remarks = remarks;
    }
    application.updatedAt = Date.now();

    await application.save();
    res.json({ message: 'Application updated successfully', application });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application', error: error.message });
  }
});

// Mount on all routes to match redirects properly
app.use('/.netlify/functions/applications', router);
app.use('/api/applications', router);
app.use('/applications', router);
app.use('/', router);

module.exports.handler = serverless(app);
