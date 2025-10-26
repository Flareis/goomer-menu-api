import { Product } from '../entities/products.entity';
import { ProductsRepository } from '../repositories/products.repository';

export class ProductsService {
  constructor(private repository = new ProductsRepository()) {}

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    return this.repository.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findById(id);
  }

  async update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    return this.repository.update(id, product);
  }

  async delete(id: number): Promise<void> {
    return this.repository.delete(id);
  }
}
