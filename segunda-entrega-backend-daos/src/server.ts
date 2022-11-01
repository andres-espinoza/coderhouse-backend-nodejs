import express from 'express';
import mongoDBConnection from './databases/mongoDB';
import productsRoute from './routes/products';
import shoppingCartRoute from './routes/shoppingCarts';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoute);
app.use('/api/shoppingCart', shoppingCartRoute);

app.use('*', (req, res) =>
  res.send({
    error: -2,
    description: `route ${req.originalUrl}, ${req.method} method, not implemented`,
  })
);

mongoDBConnection()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Http Server listening port: http://localhost:${PORT}`));
  })
  .catch((e: Error) => console.error(e?.message));
