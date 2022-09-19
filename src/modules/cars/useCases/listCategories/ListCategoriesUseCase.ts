import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export default class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute() {
    return this.categoriesRepository.list();
  }
}
