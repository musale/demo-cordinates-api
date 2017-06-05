import mongoose from 'mongoose';
import config from './config';

const options = {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

mongoose.Promise = global.Promise;
const db = mongoose.connection;

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	mongoose.connect(config.db, options);
	callback(db);
};
