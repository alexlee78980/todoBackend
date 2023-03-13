const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

// Compare password
userSchema.methods.comparePassword = async function (attempt) {
  try {
    const match = await bcrypt.compare(attempt, this.password);
    return match;
  } catch (err) {
    return false;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;