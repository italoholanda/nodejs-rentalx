import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const categoryAlreadyExists = await this.repository.findByName(name);

    if (categoryAlreadyExists)
      throw new AppError(`Category ''${name}'' already exists`);

    this.repository.create({ name, description });
  }
}
