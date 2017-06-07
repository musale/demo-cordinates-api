import chai from 'chai';
import chaiHttp from 'chai-http';
import jsonSchema from 'chai-json-schema';
import app from '../../index';

chai.should();
chai.use(chaiHttp);
chai.use(jsonSchema);

describe('TEST /api/v1/geofilter/polygon', () => {
    it('it should not GET /api/v1/geofilter/polygon', (done) => {
        chai.request(app).get('/api/v1/geofilter/polygon').end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method GET on /api/v1/geofilter/polygon is not allowed.');
            done();
        });
    });

    it('it should not PUT /api/v1/geofilter/polygon', (done) => {
        const payload = {
            test: true
        };
        chai.request(app).put('/api/v1/geofilter/polygon').send(payload).end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method PUT on /api/v1/geofilter/polygon is not allowed.');
            done();
        });
    });

    it('it should not PATCH /api/v1/geofilter/polygon', (done) => {
        chai.request(app).patch('/api/v1/geofilter/polygon').end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method PATCH on /api/v1/geofilter/polygon is not allowed.');
            done();
        });
    });

    it('it should not DELETE /api/v1/geofilter/polygon', (done) => {
        chai.request(app).delete('/api/v1/geofilter/polygon').end((err, res) => {
            res.should.have.status(405);
            res.body.should.have.property('error').eql('method DELETE on /api/v1/geofilter/polygon is not allowed.');
            done();
        });
    });

    it('it should require polygon when POSTing data to /api/v1/geofilter/polygon', (done) => {
        const payload = {
            notPolygon: [
                { lat: -1.213213, lng: 34.21321 },
                { lat: -1.235452, lng: 34.24562 },
                { lat: -1.1343, lng: 34.3121 }
            ]
        };
        chai.request(app).post('/api/v1/geofilter/polygon').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('polygon is needed!');
            done();
        });
    });

    it('it should require polygon to be a list of more than 3 coordinates when POSTing data to /api/v1/geofilter/polygon', (done) => {
        const payload = {
            polygon: [
                { lat: -1.213213, lng: 34.21321 },
                { lat: -1.235452, lng: 34.24562 }
            ]
        };
        chai.request(app).post('/api/v1/geofilter/polygon').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').to.deep.equal('polygon should have atleast 3 sides! Only 2 given');
            done();
        });
    });

    it('it should require key: value coordinate when POSTing data to /api/v1/geofilter/polygon', (done) => {
        const payload = {
            polygon: [24.9502033542525, -81.1248784353252]
        };
        chai.request(app).post('/api/v1/geofilter/polygon').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('coordinate should be a key: value object! 24.9502033542525 is not a key: value object');
            done();
        });
    });

    it('it should require numbers in value of coordinate when POSTing data to /api/v1/geofilter/polygon', (done) => {
        const payload = {
            notPolygon: [
                { lat: -1.213213, lng: '34.21321oo' },
                { lat: -1.235452, lng: 34.24562 },
                { lat: -1.1343, lng: 34.3121 }
            ]
        };
        chai.request(app).post('/api/v1/geofilter/polygon').send(payload).end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property('error').eql('polygon is needed!');
            done();
        });
    });

    it('it should respond with coordinates within ta polygon', (done) => {
        const payload = {
            "polygon": [{
                    "latitude": -1.2860228894319572,
                    "longitude": 36.821813328539356
                },
                {
                    "latitude": -1.2866669573753995,
                    "longitude": 36.82181332862068
                },
                {
                    "latitude": -1.2866669573753995,
                    "longitude": 36.82116909824216
                },
                {
                    "latitude": -1.2860228894319572,
                    "longitude": 36.82116909832338
                }
            ]
        }
        const responseSchema = {
            title: 'geofilter/polygon response v1',
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
        chai.request(app).post('/api/v1/geofilter/polygon').send(payload).end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('url').eql('/api/v1/geofilter/polygon');
            res.body.should.have.property('coordinates');
            res.body.should.have.property('status');
            res.body.should.be.jsonSchema(responseSchema);
            done();
        });
    });

});