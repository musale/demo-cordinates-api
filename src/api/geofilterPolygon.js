/**
 Given a collection of N GPS coordinates about a user’s location L,
 return a subset S of coordinates from N that are within a polygon
 defined by a series of GPS coordinates. Such that; when a client
 application makes an API request to request for coordinates,
 it will provide a polygon for an arbitrary region P on a map.
 The API should respond with coordinates that fall within the polygon.
 */
import geolib from 'geolib';

/**
 * getCoordinates fetches user coordinates from database
 * @param  {[object]} db - database object
 * @return {[array]}  array values of all the coordinates of a given user
 */
const getCoordinates = db => db.collection('geo').find().toArray();

export default (req, res) => {
    const db = req.db;
    const polygon = req.body.polygon;
    const locations = [];
    getCoordinates(db).then((result) => {
        result.forEach((res) => {
            // Assumption is polygon coordinates are ordered.
            const inside = geolib.isPointInside(res, polygon);
            if (inside) {
                locations.push({ lat: res.lat, lng: res.lng });
            }
        });
        return res.json({ url: '/api/v1/geofilter/polygon', coordinates: locations, status: "success" });
    }).catch(err => console.error(err));
};