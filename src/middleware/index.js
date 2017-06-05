import { Router } from 'express';
import isObject from 'isobject';

export default ({ db }) => {
	const routes = Router();

	routes.post('/api/v1/geofence', (req, res, next) =>{
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
		// check coordinate is an array
		if (!isObject(request.coordinate)) {
			return res.status(400).json({ error: `coordinate should be a key: value object! ${request.coordinate} is not a key: value object` });
		}

		// check all values in the coordinate are numbers
		for (const key in request.coordinate) {
			if (isNaN(request.coordinate[key])) {
				return res.status(400).json({ error: `values of coordinate should be numbers. ${key}: ${request.coordinate[key]} is not a number.`});
			}
		}
		req.db = db;
		next();

	});

	return routes;
};
