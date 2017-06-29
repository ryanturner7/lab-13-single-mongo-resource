'use strict';

const jsonParser = require('body-parser').json();
const employerRouter = module.exports = new require('express').Router();

// app modules
const Employer = require('../model/employer.js');

// module logic
employerRouter.post('/api/lists', jsonParser, (req, res, next) => {
  console.log('hit POST /api/employers');
  new Employer(req.body)
  .save()
  .then(employer => res.json(employer))
  .catch(next);
});

employerRouter.get('/api/lists/:id', (req, res, next) => {
  console.log('hit GET /api/lists/:id');

  Employer.findById(req.params.id)
  //.populate('employees')
  .then(employer => res.json(employer))
  .catch(next);
});


employerRouter.get('/api/employers', (req, res, next) => {
  console.log('Hit /api/employers.');

  let bossNumber = Number(req.query.boss);
  if(!bossNumber || bossNumber < 1) bossNumber = 1;
  bossNumber--;

  Employer.find({})
  .sort({title: 'asc'})
  .skip(bossNumber * 50)
  .limit(50)
  .then(employers => res.json(employers))
  .catch(next);
});
