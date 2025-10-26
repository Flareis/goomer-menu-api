
import { Promotions } from '../entities/promotions.entity';
import { db } from '../infra/database';

export class promotionsRepository {
  async create(promotion: Omit<Promotions, 'id'>): Promise<Promotions> {
    const { description_promotion, price, week_days, start_time, end_time } = promotion;

    const [result]: any = await db.query(
      'INSERT INTO promotions (description_promotion, price, week_days, start_time, end_time) VALUES (?, ?, ?, ?, ?)',
      [description_promotion, price, week_days, start_time, end_time]
    );

    return {
      id: result.insertId,
      description_promotion,
      price,
      week_days,
      start_time,
      end_time
    };
  }

  async findAll(): Promise<Promotions[]> {
    const [rows]: any = await db.query('SELECT * FROM promotions');
    return rows as Promotions[];
  }

  async findById(id: number): Promise<Promotions | null> {
    const [rows]: any = await db.query('SELECT * FROM promotions WHERE id = ?', [id]);
    return rows[0] || null;
  }

  async update(id: number, promotion: Partial<Omit<Promotions, 'id'>>): Promise<Promotions | null> {
    const fields: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(promotion)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }

    if (fields.length === 0) return null;

    await db.query(
      `UPDATE promotions SET ${fields.join(', ')} WHERE id = ?`,
      [...values, id]
    );

    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await db.query('DELETE FROM promotions WHERE id = ?', [id]);
  }
}
