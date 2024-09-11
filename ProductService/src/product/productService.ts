
import { db } from '../config/db';



export class ProductService {
  async create(data: { name: string; price: number }) {
    const result = await db.query(
      'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
      [data.name, data.price]
    );
    return result.rows[0];
  }

  async getAll() {
    const result = await db.query('SELECT * FROM products');
    return result.rows;
  }

  async getById(id: string) {
    const result = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) throw new Error('Product not found');
    return result.rows[0];
  }

  async update(id: string, data: { name: string; price: number }) {
    const result = await db.query(
      'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
      [data.name, data.price, id]
    );
    return result.rows[0];
  }

  async delete(id: string) {
    await db.query('DELETE FROM products WHERE id = $1', [id]);
  }
}
