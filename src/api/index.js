import {version} from '../../package.json';
import {Router} from 'express';
import geofence from './geofence';
import geofilterRectangle from './geofilterRectangle';
import geofilterPolygon from './geofilterPolygon';

export default() => {
  const api = Router();

  api.get('/', (req, res) => {
    res.json({version});
  });
  api.post('/', (req, res) => {
    res.status(405).json({ error: 'method POST to /api/v1 is not allowed.' });
  });

  api.post('/geofence', geofence);
  api.get('/geofence', (req, res) => {
    res.status(405).json({ error: 'method GET on /api/v1/geofence is not allowed.' });
  });
  api.put('/geofence', (req, res) => {
    res.status(405).json({ error: 'method PUT on /api/v1/geofence is not allowed.' });
  });
  api.patch('/geofence', (req, res) => {
    res.status(405).json({ error: 'method PATCH on /api/v1/geofence is not allowed.' });
  });
  api.delete('/geofence', (req, res) => {
    res.status(405).json({ error: 'method DELETE on /api/v1/geofence is not allowed.' });
  });
  api.post('/geofilter/rectangle', geofilterRectangle);
  api.post('/geofilter/polygon', geofilterPolygon);

  return api;
};
