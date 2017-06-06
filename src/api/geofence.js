/**
 Given a collection of N GPS coordinates about a user location L. Return a subset S of coordinates from N that are within a Radius R meters around the user’s L. Such that; when a client application makes an API request to request for coordinates, it will provide a radius in meters and a coordinate for an arbitrary location. The server should respond with coordinates within R meters of the arbitrary location
 */
import GeoPoint from 'geopoint';

/**
 * getCoordinates fetches user coordinates from database
 * @param  {[object]} db - database object
 * @return {[array]}  array values of all the coordinates of a given user
 */
const getCoordinates = db => db.collection('geo').find().toArray();

/**
 * getDistance calculates the great-circle distance between two points using the haversine formula.
 * @param  {[float]} reqLat - latitude POSTed in the request
 * @param  {[float]} reqLng - longitude POSTed in the request
 * @param  {[float]} dbLat - latitude compared against from database
 * @param  {[float]} dbLng - longitude compared against from the database
 * @return {[float]} distance (kilometres) between the point in request and point in database
 */
const getDistance = (reqLat, reqLng, dbLat, dbLng) => {
  const EARTH_RADIUS = 6371e3; // metres
  const lat1 = GeoPoint.degreesToRadians(reqLat);
  const lat2 = GeoPoint.degreesToRadians(dbLat);
  const changeInLat = GeoPoint.degreesToRadians(dbLat - reqLat);
  const changeInLng = GeoPoint.degreesToRadians(dbLng - reqLng);

  const a = Math.sin(changeInLat / 2) * Math.sin(changeInLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(changeInLng / 2) * Math.sin(changeInLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = EARTH_RADIUS * c;
  console.log(`Distance between [${reqLat}, ${reqLng}] and [${dbLat}, ${dbLng}] is ${d} metres`);
  return d;
};

/**
 * checkIfInCircle checks if calculated distance is within the radius
 * @param  {[float]} distance - calculated distance between 2 points
 * @param  {[float]} radius   - radius within points should fall
 * @return {[boolean]}        returns true if point is within radius
 */
const checkIfInCircle = (distance, radius) => {
  if (distance <= radius) {
    return true;
  } else {
    return false;
  }
};

/**
 * @param  {[object]} req - API request to request for coordinates
 * @param  {[object]} res - response object
 * @return {[object]} coordinates within R meters of the arbitrary location
 */
export default (req, res) => {
  const db = req.db;
  const locations = [];
  const coordinate = req.body.coordinate;
  const arbLocation = req.body.radius;
  getCoordinates(db).then((result) => {
    result.forEach((res) => {
      const distance = getDistance(coordinate.lat, coordinate.lng, res.lat, res.lng);
      if (checkIfInCircle(distance, arbLocation)) {
        locations.push({ lat: res.lat, lng: res.lng });
      }
    });
    res.json({ url: '/api/v1/geofence', coordinates: locations, radius: arbLocation });
  }).catch(err => console.error(err));
};
