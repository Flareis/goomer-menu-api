import { Request, Response } from 'express';
import { ProductsService } from '../services/product.service';

export class ProductsController {
  constructor(private service = new ProductsService()) {}

  async create(req: Request, res: Response) {
    try {
      const product = await this.service.create(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    const products = await this.service.findAll();
    res.json(products);
  }

  async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await this.service.findById(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await this.service.update(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Product not found or nothing to update' });
    res.json(updated);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(204).send();
  }
}
