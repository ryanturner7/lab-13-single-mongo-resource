'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

const app = express;

app.use(morgan('dev'));
app.use(cors());

app.use(require('../route/employer-router.js'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});

app.use('require', ('./error-middleware.js'));

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) {
      server.http = app.listen(process.env.PORT, () => {
        server.isOn = true;
        console.log('The server is up.', process.env.PORT);
        resolve;
      })
      return;
    }
    reject(new Error('The server is already running.'));
  })
}
server.stop = () => {
   return new Promise((resolve, reject) => {
     if(server.http && server.isOn){
       return server.http.close(() => {
         server.isOn = false
         console.log('The server is down.')
         resolve()
       })
     }
     reject(new Error('The server is not running.'))
   })
 }
