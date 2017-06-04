/**
 Given a collection of N GPS coordinates about a user location L. Return a subset S of coordinates from N that are within a Radius R meters around the user’s L. Such that; when a client application makes an API request to request for coordinates, it will provide a radius in meters and a coordinate for an arbitrary location. The server should respond with coordinates within R meters of the arbitrary location
 */
import GeoPoint from 'geopoint';

let coordinates;

/**
 * getCoordinates fetches user coordinates from database
 * @param  {[object]} db - database object
 * @return {[array]}  array values of all the coordinates of a given user
 */
var getCoordinates = db => db.collection('geo').find().toArray();

/**
 * getDistance calculates the great-circle distance between two points using the haversine formula.
 * @param  {[float]} reqLat - latitude POSTed in the request
 * @param  {[float]} reqLng - longitude POSTed in the request
 * @param  {[float]} dbLat - latitude compared against from database
 * @param  {[float]} dbLng - longitude compared against from the database
 * @return {[float]} distance (kilometres) between the point in request and point in database
 */
var getDistance = (reqLat, reqLng, dbLat, dbLng) => {
  var EARTH_RADIUS = 6371e3; // metres
  var lat1 = GeoPoint.degreesToRadians(reqLat);
  var lat2 = GeoPoint.degreesToRadians(dbLat);
  var changeInLat = GeoPoint.degreesToRadians(dbLat - reqLat);
  var changeInLng = GeoPoint.degreesToRadians(dbLng - reqLng);

  var a = Math.sin(changeInLat / 2) * Math.sin(changeInLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(changeInLng / 2) * Math.sin(changeInLng / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = EARTH_RADIUS * c;
  console.log(`Distance between [${reqLat}, ${reqLng}] and [${dbLat}, ${dbLng}] is ${d} metres`);
  return d;
}

/**
 * checkIfInCircle checks if calculated distance is within the radius
 * @param  {[float]} distance - calculated distance between 2 points
 * @param  {[float]} radius   - radius within points should fall
 * @return {[boolean]}        returns true if point is within radius
 */
var checkIfInCircle = (distance, radius) => {
  if (distance <= radius) {
    return true;
  } else {
    return false;
  }
}

/**
 * @param  {[object]} req - API request to request for coordinates
 * @param  {[object]} res - response object
 * @return {[object]} coordinates within R meters of the arbitrary location
 */
export default(req, res) => {
  const db = req.db;
  let locations = [];
  const coordinate = req.body.coordinate;
  const arbLocation = req.body.radius;
  getCoordinates(db).then((result) =>{
    result.forEach((res)=>{
      let distance = getDistance(coordinate.lat, coordinate.lng, res.lat, res.lng);
      if (checkIfInCircle(distance, arbLocation)) {
        locations.push([res.lat, res.lng]);
      }
    })
    res.json({url: '/api/v1/geofence', coordinates: locations, radius: arbLocation});
  }).catch(err => console.error(err));
}
