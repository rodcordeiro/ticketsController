const knex = require('knex');
const configuration = require('../../knexfile');
import dotenv from 'dotenv'
dotenv.config()

const connection = knex(configuration[process.env.NODE_ENV]);

export default connection;