import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private repository: ICategoriesRepository) {
    this.repository = repository;
  }

  execute({ description, name }: IRequest) {
    const categoryAlreadyExists = this.repository.findByName(name);

    if (categoryAlreadyExists)
      throw new Error(`Category ''${name}'' already exists`);

    this.repository.create({ name, description });
  }
}
