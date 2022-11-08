import dotenv from 'dotenv';

dotenv.config();

import knex from 'knex';

const mariaDB = {
  client: 'mysql',
  connection: {
    host: process.env.MDB_HOST as string,
    port: process.env.MDB_PORT as string,
    user: process.env.MDB_USER as string,
    password: process.env.MDB_PASSWORD as string,
    database: process.env.MDB_DB_NAME as string,
  },
};

const mdb = knex(mariaDB);
export default mdb;
