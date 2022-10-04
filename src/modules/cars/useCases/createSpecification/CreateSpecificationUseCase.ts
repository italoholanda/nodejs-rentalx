import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private repository: ISpecificationRepository
  ) {}

  async execute({ description, name }: IRequest) {
    const specificationAlreadyExists = await this.repository.findByName(name);

    if (specificationAlreadyExists)
      throw new AppError(`Specification ''${name}'' already exists`);

    this.repository.create({ name, description });
  }
}
