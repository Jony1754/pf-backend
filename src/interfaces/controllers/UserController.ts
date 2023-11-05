import { UserRepository } from '../drivers/UserRepository';
export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(userData: any) {
    const user = await this.userRepository.create(userData);
    return user;
  }

  async login(userData: any) {
    if (userData.email) {
      console.log('login: ', userData);
      const user = await this.userRepository.findByEmail(userData.email);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }
  }

  async getUserById(userId: number) {
    console.log('getUserById: ', userId);
    return await this.userRepository.getById(userId);
  }

  async updateUser(userId: number, updatedData: any) {
    return await this.userRepository.update(userId, updatedData);
  }

  async deleteUser(userId: number) {
    await this.userRepository.delete(userId);
    return { message: 'User deleted successfully' };
  }
}
