import { Request, Response } from 'express';
import { PromotionsService } from '../services/promotions.service';

export class PromotionsController {
  constructor(private service = new PromotionsService()) { }

  async create(req: Request, res: Response) {
    try {
      const promotion = await this.service.create(req.body);
      res.status(201).json(promotion);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const promotions = await this.service.findAll();
    res.json(promotions);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const promotion = await this.service.findById(id);
    if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
    res.json(promotion);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await this.service.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Promotion not found or nothing to update' });
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(204).send();
  }

  async findActive(req: Request, res: Response) {
    const activePromotions = await this.service.findActive();
    res.json(activePromotions)
  }
}
