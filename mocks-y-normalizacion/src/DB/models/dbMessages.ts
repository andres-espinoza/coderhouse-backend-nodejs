import sqlite3 from '../sqlite3Config';

(async () => {
  try {
    const isTable = await sqlite3.schema.hasTable('messages');
    if (!isTable) {
      await sqlite3.schema.createTable('messages', (table) => {
        table.increments('id').primary().notNullable();
        table.string('email').notNullable();
        table.string('message').notNullable();
        table.dateTime('dateTime').notNullable();
      });
      console.log('Table messages succesfully created');
    } else console.log('Table messages is already created');
  } catch (error) {
    console.log(error);
  }
})();
