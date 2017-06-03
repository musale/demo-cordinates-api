//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = 3001; // to keep my server running and run tests on a diff port

let mongoose = require("mongoose");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET homepage', () => {
  it('it should GET the homepage', (done) => {
    chai.request(server).get('/').end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});
