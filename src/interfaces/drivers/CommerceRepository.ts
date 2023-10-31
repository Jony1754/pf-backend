import { CommerceDB } from '../../infrastructure/database/CommerceDB';

export class CommerceRepository {
  async create(commerceData: any): Promise<CommerceDB> {
    return await CommerceDB.create(commerceData);
  }

  async getAll(): Promise<CommerceDB[]> {
    return await CommerceDB.findAll();
  }

  async getById(commerceId: number): Promise<CommerceDB | null> {
    return await CommerceDB.findByPk(commerceId);
  }

  async getAllByUserId(userId: number): Promise<CommerceDB[]> {
    return await CommerceDB.findAll({ where: { userId } });
  }

  async update(commerceId: number, updates: any): Promise<CommerceDB> {
    const commerce = await this.getById(commerceId);
    if (!commerce) throw new Error('Commerce not found');

    return await commerce.update(updates);
  }

  async delete(commerceId: number): Promise<void> {
    const commerce = await this.getById(commerceId);
    if (!commerce) throw new Error('Commerce not found');

    await commerce.destroy();
  }
}
