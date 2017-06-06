import { Router } from 'express';
import isObject from 'isobject';

const validateCoordinate = (res, coordinate, next) => {
    // check coordinate is an array
    if (!isObject(coordinate)) {
        return res.status(
            400).json({ error: `coordinate should be a key: value object! ${coordinate} is not a key: value object` });
    }
    for (const key in coordinate) {
        if (isNaN(coordinate[key])) {
            return res.status(
                400).json({ error: `values of coordinate should be numbers. ${key}: ${coordinate[key]} is not a number.` });
        }
    }
    return next();
};

export default ({ db }) => {
    const routes = Router();
    routes.use((req, res, next) => {
        req.db = db;
        next();
    });
    routes.post('/api/v1/geofence', (req, res, next) => {
        const radius = 'radius';
        const coordinate = 'coordinate';
        const request = req.body;
        const params = [radius, coordinate];
        // check radius and coordinate are supplied
        for (const param in params) {
            if (!(params[param] in request)) {
                return res.status(400).json({ error: `${params[param]} is needed!` });
            }
        }
        // check radius is a number
        if (isNaN(request.radius)) {
            return res.status(400).json({ error: `radius should be a number! ${request.radius} is not a number` });
        }
        // check all values in the coordinate are numbers
        validateCoordinate(res, request.coordinate, next);
    });

    routes.post('/api/v1/geofilter/rectangle', (req, res, next) => {
        const length = 'length';
        const width = 'width';
        const coordinate = 'coordinate';
        const request = req.body;
        const params = [length, width, coordinate];
        // check length, width and coordinate are supplied
        for (const param in params) {
            if (!(params[param] in request)) {
                return res.status(400).json({ error: `${params[param]} is needed!` });
            }
        }
        if (isNaN(request.length)) {
            return res.status(400).json({ error: `length should be a number! ${request.length} is not a number` });
        }
        if (isNaN(request.width)) {
            return res.status(400).json({ error: `width should be a number! ${request.width} is not a number` });
        }
        validateCoordinate(res, request.coordinate, next);
    });

    return routes;
};