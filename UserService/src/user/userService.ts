import { db } from '../config/db';
import bcrypt from 'bcrypt';

export class UserService {
  async register(data: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await db.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [data.email, hashedPassword]
    );
    return result.rows[0];
  }

  async login(email: string, password: string) {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) throw new Error('Invalid password');

    return user.rows[0];
  }

  async getProfile(userId: string) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    return result.rows[0];
  }
}
