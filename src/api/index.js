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

  api.post('/geofence', geofence);
  api.post('/geofilter/rectangle', geofilterRectangle);
  api.post('/geofilter/polygon', geofilterPolygon);

  return api;
};
