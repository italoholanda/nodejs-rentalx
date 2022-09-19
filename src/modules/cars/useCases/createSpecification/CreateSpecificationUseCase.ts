import ISpecificationRepository from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationUseCase {
  constructor(private repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute({ description, name }: IRequest) {
    const specificationAlreadyExists = this.repository.findByName(name);

    if (specificationAlreadyExists)
      throw new Error(`Specification ''${name}'' already exists`);

    this.repository.create({ name, description });
  }
}
