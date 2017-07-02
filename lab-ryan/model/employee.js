'use strict';

const faker = require('faker');
const mockEmployer = require('./../mock-employer.js');
const Employee = require('../../model/employee.js');

const mockEmployee = module.exports = {}

mock.createOne = () => {
  title: {type: String, required: true, unique: true},
  employer: [{type: mongoose.Schema.Types.ObjectId, ref: 'employer'}],
  name: {type: String, required: true},
  age: {type: Number, required: true},
});

employeeSchema.pre('save', function(next){
  Employer.findById(this.employer)
  .then(() => next())
  .catch(() => next(new Error('Failed to create employee because employer does not exist.')));
});

employeeSchema.post('save', function(doc, next) {
  Employer.findById(doc.employer)
  .then(employer => {
    employer.employees = employer.employees.filter(employee => employee._id !== doc._id);
    return employer.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('employee', employeeSchema);
