const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;