import { Router } from 'express';
import ProductsMongoDAO from '../databases/daos/product/mongoDB';
import profileChecker from '../middlewares/profileChecker';
import { IProduct } from '../models/Product';

const route = Router();

route
  .get('/', async (_req, res) => {
    try {
      const products = await ProductsMongoDAO.getAll();
      res.status(200).send(products);
    } catch (error: any) {
      res.sendStatus(500);
    }
  })
  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const product = await ProductsMongoDAO.getById(id);
      res.status(200).send(product);
    } catch (error: any) {
      res.sendStatus(500);
    }
  })
  .post('/', profileChecker(), async (req, res) => {
    const newProducts: IProduct[] = req.body;
    try {
      const addedProduct = await ProductsMongoDAO.create(newProducts);
      res.status(200).send(addedProduct);
    } catch (error: any) {
      res.sendStatus(500);
    }
  })
  .put('/:id', profileChecker(), async (req, res) => {
    try {
      const product: IProduct = req.body;
      const { id } = req.params;
      const message = await ProductsMongoDAO.updateById(id, product);
      res.status(200).send(message);
    } catch (error: any) {
      res.sendStatus(500);
    }
  })
  .delete('/:id', profileChecker(), async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await ProductsMongoDAO.deleteById(id);
      console.log(deletedProduct);
      res.status(200).send(deletedProduct);
    } catch (error: any) {
      res.sendStatus(500);
    }
  });

export default route;
