import { getRepository, Repository } from "typeorm";

import Category from "../../entities/Category";
import { ICategoryDTO, ICategoriesRepository } from "../ICategoriesRepository";

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async findByName(name: string) {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async create({ name, description }: ICategoryDTO) {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async list() {
    const categories = await this.repository.find();
    return categories;
  }
}
