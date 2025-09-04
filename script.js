 const express = require('express');
const router = express.Router();
const multer = require('multer');
const Issue = require('../models/Issue'); // Mongoose model

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/issues', upload.single('photo'), async (req, res) => {
  try {
    const { title, description, category, location } = req.body;
    // TODO: Upload photo to cloud storage and get URL
    const photoUrl = req.file ? await uploadToCloud(req.file) : null;

    const newIssue = new Issue({
      title,
      description,
      category,
      location,
      photoUrl,
      status: 'Reported',
      createdAt: new Date(),
    });

    await newIssue.save();
    res.status(201).json({ message: 'Issue reported successfully', issue: newIssue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
