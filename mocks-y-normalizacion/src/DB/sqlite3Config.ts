import knex from 'knex';

const sqlite3Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/DB/sqlite3/sqlitedb'
  },
  useNullAsDefault: false
};

const sqlite3 = knex(sqlite3Config);
export default sqlite3;
