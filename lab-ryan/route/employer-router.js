'use strict';

const jsonParser = require('body-parser').json();
const employerRouter = module.exports = new require('express').Router();

// app modules
const Employer = require('../model/employer.js');

// module logic
employerRouter.post('/api/employers', jsonParser, (req, res, next) => {
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

employerRouter.put('/api/employers/:id', jsonParser, (req, res, next) => {
  console.log('PUT route', typeof req.body.name);
  Employer.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
.then(ship => res.json(ship))
.catch(next);
});

employerRouter.delete('/api/employers/:id', (req, res, next) => {
  Employer.findByIdAndRemove(req.params.id)
.then(() => res.sendStatus(204))
.catch(next);

  // let bossNumber = Number(req.query.boss);
  // if(!bossNumber || bossNumber < 1) bossNumber = 1;
  // bossNumber--;
  //
  // Employer.find({})
  // .sort({title: 'asc'})
  // .skip(bossNumber * 50)
  // .limit(50)
  // .then(employers => res.json(employers))
  // .catch(next);
});
