import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import database from './mongodb';
import middleware from './middleware';
import api from './api';
import config from './config';

const app = express();
app.server = http.createServer(app);

// logger
if (process.env.NODE_ENV !== 'test') {
	app.use(morgan('dev'));
}

// 3rd party middleware
app.use(cors({exposedHeaders: config.corsHeaders}));

app.use(bodyParser.json({limit: config.bodyLimit}));

// connect to db
database.connect(config.db, function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
	const db = database.getDB();
    // internal middleware
	app.use(middleware({ db }));

	// api router
	app.use('/api/v1', api({ config, db }));
	app.server.listen(process.env.PORT || config.port);
	console.log(`Started on port ${app.server.address().port} ${process.env.NODE_ENV}`);
  }
});

export default app;
