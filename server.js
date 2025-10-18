const express = require('express');
const mongoose = require('mongoose');

const app = express();

// 🔹 1. Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/quizdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 🔹 2. Define Schema & Model
const UserSchema = new mongoose.Schema({
  name: String,
  score: Number
});
const User = mongoose.model('User', UserSchema);

// 🔹 3. Routes
app.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(5);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 4. Start Server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});