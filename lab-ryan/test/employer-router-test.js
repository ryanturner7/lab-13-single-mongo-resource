'use strict';

require('dotenv').config({path: `${__dirname}/../.test.env`});

const faker = require('faker');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
const clearDB = require('./lib/clear-db.js');
const mockEmployer = require('./lib/mock-employer.js');

// let tempEmployer;
const API_URL = process.env.API_URL;

describe('Testing /api/employers', () => {
  before(server.start);
  after(server.stop);
  afterEach(clearDB);

  describe('Testing POST /api/employers.', () => {
    let data = {
      company: faker.company.companyName(),
      name: faker.name.findName(),
    };
    it('Should respond with an employer.', () => {
      return superagent.post(`${API_URL}/api/employers`)
      .send(data)
      .then(res => {
        console.log('data', data);
        expect(res.status).toEqual(200);
        expect(res.body.company).toEqual(data.company);
        expect(res.body.employees).toEqual([]);
        expect(res.body._id).toExist();
      })
      .catch((err) => {
        console.log(err);
      });
    });
  });
});
