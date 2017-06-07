import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonSchema from 'chai-json-schema';
import app from '../../index';

chai.should();
chai.use(chaiHttp);
chai.use(jsonSchema);

describe('TEST /api/v1/geofilter/rectangle', () => {
    it('it should not GET /api/v1/geofilter/rectangle', (done) => {
        chai.request(app).get('/api/v1/geofilter/rectangle').end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method GET on /api/v1/geofilter/rectangle is not allowed.');
            done();
        });
    });

    it('it should not PUT /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            test: true
        };
        chai.request(app).put('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method PUT on /api/v1/geofilter/rectangle is not allowed.');
            done();
        });
    });

    it('it should not PATCH /api/v1/geofilter/rectangle', (done) => {
        chai.request(app).patch('/api/v1/geofilter/rectangle').end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method PATCH on /api/v1/geofilter/rectangle is not allowed.');
            done();
        });
    });

    it('it should not DELETE /api/v1/geofilter/rectangle', (done) => {
        chai.request(app).delete('/api/v1/geofilter/rectangle').end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method DELETE on /api/v1/geofilter/rectangle is not allowed.');
            done();
        });
    });

    it('it should require length when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            width: 50.07,
            coordinate: ['36.2387289574', '-7.9842525248']
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('length is needed!');
            done();
        });
    });

    it('it should require length to be a number when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            length: '5o',
            width: 230.09,
            coordinate: ['36.2387289574', '-7.9842525248']
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('length should be a number! 5o is not a number');
            done();
        });
    });

    it('it should require width when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            length: 150.07,
            coordinate: ['36.2387289574', '-7.9842525248']
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('width is needed!');
            done();
        });
    });

    it('it should require width to be a number when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            width: '5o',
            length: 230.09,
            coordinate: ['36.2387289574', '-7.9842525248']
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('width should be a number! 5o is not a number');
            done();
        });
    });

    it('it should require coordinate when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            length: 50,
            width: 12.231
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('coordinate is needed!');
            done();
        });
    });

    it('it should require key: value coordinate when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            length: 50,
            width: 12.231,
            coordinate: [24.9502033542525, -81.1248784353252]
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('coordinate should be a key: value object! 24.9502033542525,-81.1248784353252 is not a key: value object');
            done();
        });
    });

    it('it should require numbers in value of coordinate when POSTing data to /api/v1/geofilter/rectangle', (done) => {
        const payload = {
            length: 50,
            width: 12.231,
            coordinate: {
                lat: 24.9502033542525,
                lng: '-81.1248784353252o'
            }
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('values of coordinate should be numbers. lng: -81.1248784353252o is not a number.');
            done();
        });
    });

    it('it should respond with coordinates within a rectangle of the specified dimensions', (done) => {
        const payload = {
            "length": "10.01",
            "width": "100.90",
            "coordinate": {
                "lat": -1.286344923424,
                "lng": "36.8214912134314"
            }
        };
        const responseSchema = {
            title: 'geofilter/rectangle response v1',
            type: 'object',
            required: ['url', 'coordinates', 'status'],
            properties: {
                url: {
                    type: 'string',
                },
                coordinates: {
                    type: 'array',
                    minItems: 0,
                    items: {
                        type: 'object',
                    }
                },
                status: {
                    type: 'string'
                }
            }
        };
        chai.request(app).post('/api/v1/geofilter/rectangle').send(payload).end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('url').eql('/api/v1/geofilter/rectangle');
            res.body.should.have.property('coordinates');
            res.body.should.have.property('status');
            res.body.should.be.jsonSchema(responseSchema);
            done();
        });
    });

});