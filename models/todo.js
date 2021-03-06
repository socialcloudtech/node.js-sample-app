// todo.js
require.paths.unshift('vendor/mongoose');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/todo');
var Schema = mongoose.Schema;

var Todo = new Schema({
  name: {
    type: String,
    index: true,
    validate: [function(v){return v.length > 0;}, 'name is required.'],
  },
  todo_state: Number,
  memo: {
    type: String,
    validate: [function(v){return v.length > 0;}, 'memo is required.'],
  },
  created_at: Date
});

Todo.pre('save', function(next) {
  if (this.isNew) {
    this.todo_state = 0;
    this.created_at = new Date();
  }
  next();
});
mongoose.model('Todo', Todo);

//module.exports = Todo;
module.exports = db.model('Todo');

// vim: set ts=2 sw=2 sts=2 expandtab fenc=utf-8:
