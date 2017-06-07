/**
 Given a collection of N GPS coordinates about a user location L.
 Return a subset S of coordinates from N that are within a rectangle of
 width w and length l around the user’s location L. Such that;
 when a client application makes an API request to request for coordinates,
 it will provide a length l and width w in meters and a coordinate for an
 arbitrary location L. The API should respond with coordinates within a
 rectangle of the specified dimensions with L at the center of the rectangle.
 */
import geolib from 'geolib';

/**
 * getCoordinates fetches user coordinates from database
 * @param  {[object]} db - database object
 * @return {[array]}  array values of all the coordinates of a given user
 */
const getCoordinates = db => db.collection('geo').find().toArray();

/**
 * getHypotenuse gets the hypotenuse given length and width
 * @param  {[number]} length - length of the triangle
 * @param  {[number]} width - width of the triangle
 * @return {[number]} hypotenuse of the triangle
 */
const getHypotenuse = (length, width) => {
    const length2 = length * length;
    const width2 = width * width;
    return Math.sqrt(length2 + width2);
};

// Gives the corner bearing of the rectangle in an anti-clockwise manner
const rectangleCorners = [45, 135, 225, 315];


/**
 * @param  {[object]} req - API request to request for coordinates
 * @param  {[object]} res - response object
 * @return {[object]} coordinates within a rectangle of the specified dimensions
 */
export default (req, res) => {
    const db = req.db;
    const coordinate = req.body.coordinate;
    const length = Number(req.body.length) / 2;
    const width = Number(req.body.width) / 2;
    const hypotenuse = getHypotenuse(length, width);
    const rectangleCoordinates = []; // use method of finding point in polygon
    const locations = [];

    for (let corner = 0; corner < rectangleCorners.length; corner++) {
        rectangleCoordinates.push(
            geolib.computeDestinationPoint(
                coordinate, hypotenuse, rectangleCorners[corner]));
    }
    getCoordinates(db).then((result) => {
        result.forEach((res) => {
            const inside = geolib.isPointInside(res, rectangleCoordinates);
            if (inside) {
                locations.push({ lat: res.lat, lng: res.lng });
            }
        });
        return res.json({ url: '/api/v1/geofilter/rectangle', coordinates: locations, status: "success" });
    }).catch(err => console.error(err));

};