/**
 Given a collection of N GPS coordinates about a user location L.
 Return a subset S of coordinates from N that are within a rectangle of
 width w and length l around the user’s location L. Such that;
 when a client application makes an API request to request for coordinates,
 it will provide a length l and width w in meters and a coordinate for an
 arbitrary location L. The API should respond with coordinates within a
 rectangle of the specified dimensions with L at the center of the rectangle.
 */

export default (req, res) => {
    res.json({ url: '/api/v1/geofilter/rectangle' });
};