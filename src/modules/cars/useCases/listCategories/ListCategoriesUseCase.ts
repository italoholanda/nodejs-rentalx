import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export default class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}
