import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from './userService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async register(req: Request, res: Response) {
    try {
      const user = await this.userService.register(req.body);
      res.status(201).json(user);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login(email, password);
      const token = jwt.sign({ id: user.id }, '12dedah324');
      res.json({ token });
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const user = await this.userService.getProfile(userId!);
      res.json(user);
    } catch (error:any) {
      res.status(400).json({ error: error.message });
    }
  }
}
