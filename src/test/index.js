import chai from 'chai';
import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';
const app = 'http://localhost:5000'; // using base url as app import is causing chaos :eye roll:

chai.should();
chai.use(chaiHttp);

describe('TEST /api/v1', () => {
  it('it should GET /api/v1/', (done) => {
    chai.request(app).get('/api/v1').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  it('it should POST dummy payload to /api/v1', (done) => {
    const payload = {
      name: 'test'
    };
    chai.request(app).post('/api/v1').send(payload).end((err, res) => {
      res.should.have.status(405);
      done();
    });
  });
});
