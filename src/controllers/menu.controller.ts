import { Request, Response } from 'express';
import { MenuService } from '../services/menu.service';
import { ProductsRepository } from '../repositories/products.repository';
import { PromotionsRepository } from '../repositories/promotions.repository';

export class MenuController {
  constructor(
    private service = new MenuService(
      new ProductsRepository(),
      new PromotionsRepository(),
    ),
  ) {}

  async getMenu(req: Request, res: Response) {
    try {
      const menu = await this.service.getMenu();
      res.json(menu);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
