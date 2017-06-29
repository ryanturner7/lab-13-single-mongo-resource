'use strict';

const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  age: {type: Number, required: true},
});

module.exports = mongoose.model('employee', employeeSchema);
