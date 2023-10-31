import { CommerceRepository } from '../drivers/CommerceRepository';

export class CommerceController {
  private commerceRepo: CommerceRepository;

  constructor(commerceRepo: CommerceRepository) {
    this.commerceRepo = commerceRepo;
  }

  async getAllCommerces() {
    return await this.commerceRepo.getAll();
  }
  async createCommerce(data: any) {
    return await this.commerceRepo.create(data);
  }

  async getCommerceById(id: number) {
    return await this.commerceRepo.getById(id);
  }

  async getCommercesByUserId(userId: number) {
    return await this.commerceRepo.getAllByUserId(userId);
  }

  async updateCommerce(id: number, updates: any) {
    return await this.commerceRepo.update(id, updates);
  }

  async deleteCommerce(id: number) {
    await this.commerceRepo.delete(id);
  }
}
