import { inject, injectable } from "tsyringe";

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
      throw new Error(`Specification ''${name}'' already exists`);

    this.repository.create({ name, description });
  }
}
