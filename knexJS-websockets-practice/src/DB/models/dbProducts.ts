import mdb from '../mdbConfig';

(async () => {
  try {
    const isTable = await mdb.schema.hasTable('products');
    if (!isTable) {
      await mdb.schema.createTable('products', (table) => {
        table.increments('id').primary().notNullable();
        table.string('title').notNullable();
        table.integer('price').notNullable();
        table.string('url').notNullable();
      });
      console.log('Table products succesfully created');
    } else console.log('Table products is already created');
  } catch (error) {
    console.log(error);
  }
})();
