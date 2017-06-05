import { Router } from 'express';

export default ({ config, db }) => {
	const routes = Router();

	routes.post('/api/v1/geofence', (req, res, next) =>{
		const radius = "radius";
		const coordinate = "coordinate";
		const request = req.body;
		const params = [radius, coordinate];
		for (const param in params) {
			if (!(params[param] in request)) {
				res.json(`Error: ${params[param]} is needed!`);
			}
		}
		req.db = db;
		next();

	});

	return routes;
};
