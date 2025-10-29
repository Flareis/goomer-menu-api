import { Router } from "express";
import { PromotionsController } from "../controllers/promotions.controller";

const promotionsRoutes = Router();
const promotionsController = new PromotionsController();

//rota para criar uma promoção
promotionsRoutes.post('/', (req, res) =>
  promotionsController.create(req, res));

// rota para obter todas as promoções
promotionsRoutes.get('/', (req, res) =>
  promotionsController.findAll(req, res))

// rota para obter promoções ativas
promotionsRoutes.get('/activePromotions', (req, res) =>
  promotionsController.findActive(req, res))

// rota para obter uma promoção por ID
promotionsRoutes.get('/:id', (req, res) =>
  promotionsController.findById(req, res))

// rota para atualizar uma promoção por ID
promotionsRoutes.put('/:id', (req, res) =>
  promotionsController.update(req, res))

// rota para deletar uma promoção por ID
promotionsRoutes.delete('/:id', (req, res) =>
  promotionsController.delete(req, res));

export default promotionsRoutes;