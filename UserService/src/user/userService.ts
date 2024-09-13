import bcrypt from 'bcrypt';
import { User } from './userModel'; // Assuming you have a User model defined with Mongoose

export class UserService {
  async register(data: { email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = new User({
      email: data.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return user;
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error('Invalid password');

    return user;
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
  }
}
