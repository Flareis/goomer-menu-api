import { Promotions } from '../entities/promotions.entity';
import { PromotionsRepository } from '../repositories/promotions.repository';

// uso de regex para verificar a formatação HH:mm
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

// isValidTime recebe uma string e retorna true se estiver no formato HH:mm
function isValidTime(time: string) {
  return TIME_REGEX.test(time);
}
export class PromotionsService {
  constructor(private repository = new PromotionsRepository()) { }

  async create(promotion: Omit<Promotions, 'id'>): Promise<Promotions> {
    if (!isValidTime(promotion.start_time) || !isValidTime(promotion.end_time)) {
      throw new Error('Invalid time format. Please use the HH:mm format.');
    }
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

  async findActive(): Promise<Promotions[]> {
    return this.repository.findActive();
  }
}
