import { Promotions } from '../entities/promotions.entity';
import { PromotionsRepository } from '../repositories/promotions.repository';

export class PromotionsService {
  constructor(private repository = new PromotionsRepository()) { }

  async create(promotion: Omit<Promotions, 'id'>): Promise<Promotions> {
    return this.repository.create(promotion);
  }

  async findAll(): Promise<Promotions[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<Promotions | null> {
    return this.repository.findById(id);
  }

  async update(id: number, Promotions: Partial<Omit<Promotions, 'id'>>): Promise<Promotions | null> {
    return this.repository.update(id, Promotions);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
