import { Router } from 'express';
import { ShoppingCartDAO } from '../databases/daos';

const route = Router();
route
  .get('/:id/products', async (req, res) => {
    try {
      const { id } = req.params;
      const productsInCart = await ShoppingCartDAO.getById(id);
      res.status(200).send(productsInCart);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .post('/', async (req, res) => {
    let newShoppingCart;
    try {
      //* Espero que lleguen solo los id's de los productos
      const products: string[] = req.body;
      if (products.length < 1) {
        newShoppingCart = await ShoppingCartDAO.create();
      } else {
        newShoppingCart = await ShoppingCartDAO.create({ products });
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
      const message = await ShoppingCartDAO.updateById(id, products);
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
      const message = await ShoppingCartDAO.deleteProductById(cartId, prodId);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const message = await ShoppingCartDAO.deleteById(id);
      res.status(200).send(message);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

export default route;
