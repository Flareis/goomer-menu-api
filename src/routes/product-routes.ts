import { Router } from 'express';
import { ProductsController } from '../controllers/products.controller';

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.post('/', (req, res) => productsController.create(req, res));

productsRoutes.get('/', (req, res) => productsController.findAll(req, res));

productsRoutes.get('/:id', (req, res) => productsController.findById(req, res));

productsRoutes.put('/:id', (req, res) => productsController.update(req, res));

productsRoutes.delete('/:id', (req, res) => productsController.delete(req, res));

export default productsRoutes;
