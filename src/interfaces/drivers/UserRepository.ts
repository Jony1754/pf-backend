import { UserDB } from '../../infrastructure/database/UserDB';
export class UserRepository {
  async create(userData: any): Promise<UserDB> {
    return await UserDB.create(userData);
  }

  async getById(userId: number): Promise<UserDB | null> {
    return await UserDB.findByPk(userId);
  }
  async updateBalance(userId: number, amount: number): Promise<UserDB> {
    const user = await UserDB.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.balance += amount;
    await user.save();

    return user;
  }

  async update(userId: number, updatedData: any): Promise<UserDB> {
    const user = await UserDB.findByPk(userId);
    if (!user) throw new Error('User not found');

    user.update(updatedData);
    await user.save();
    return user;
  }

  async delete(userId: number): Promise<void> {
    const user = await UserDB.findByPk(userId);
    if (user) await user.destroy();
  }
}
