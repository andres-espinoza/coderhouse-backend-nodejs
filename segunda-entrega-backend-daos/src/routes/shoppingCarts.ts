import { Router } from 'express';
import { IProduct } from '../models/Product';
import ShoppingCartsMongoDAO from '../databases/daos/shoppingCart/mongoDB';

const route = Router();

route
  .get('/:id/products', async (req, res) => {
    try {
      const { id } = req.params;
      const productsInCart = await ShoppingCartsMongoDAO.getById(id);
      res.status(200).send(productsInCart);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .post('/', async (req, res) => {
    let newShoppingCart;
    try {
      const products: IProduct[] = req.body;
      if (products.length < 1) {
        newShoppingCart = await ShoppingCartsMongoDAO.create();
      } else {
        newShoppingCart = await ShoppingCartsMongoDAO.create({ products });
      }
      res.status(200).send(newShoppingCart);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .put('/:id/products', async (req, res) => {
    try {
      const { id } = req.params;
      const products: string[] = req.body;
      const message = await ShoppingCartsMongoDAO.updateById(id, products);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .delete('/:id/products/:prodId', async (req, res) => {
    try {
      const { id: cartId } = req.params;
      const { prodId } = req.params;
      const message = await ShoppingCartsMongoDAO.deleteProductById(cartId, prodId);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const message = await ShoppingCartsMongoDAO.deleteById(id);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

export default route;
