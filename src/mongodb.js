import {credentials} from './config';
import {MongoClient} from 'mongodb';

const db = credentials.db;
const connectionString = `mongodb://${db.user}:${db.password}@ds137220.mlab.com:37220/mdb`;

export default callback => {
  MongoClient.connect(connectionString, (err, database) => {
    if (err)
      return console.error(err);
    callback(database);
  });
};
