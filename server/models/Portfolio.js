const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  location: String,
  profileImage: String,
  coverImage: String,
  resumeUrl: String,
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    portfolio: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
