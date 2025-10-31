import { Product } from '../entities/products.entity';
import { db } from '../infra/database';

export class ProductsRepository {
  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const { name, price, category, visibility } = product;

    const [result]: any = await db.query(
      'INSERT INTO products (name, price, category, visibility) VALUES (?, ?, ?, ?)',
      [name, price, category, visibility],
    );

    return {
      id: result.insertId,
      name,
      price,
      category,
      visibility,
    };
  }

  async findAll(): Promise<Product[]> {
    const [rows]: any = await db.query('SELECT * FROM products WHERE visibility = 1');
    return rows as Product[];
  }

  async findById(id: number): Promise<Product | null> {
    const [rows]: any = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async update(id: number, product: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(product)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) return null;

    await db.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, [...values, id]);

    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  }
}
