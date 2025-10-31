import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';

const menuRoutes = Router();
const menuController = new MenuController();

menuRoutes.get('/', (req, res) => menuController.getMenu(req, res));

export default menuRoutes;
