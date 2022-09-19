import ISpecificationRepository from "../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateSpecificationService {
  constructor(private repository: ISpecificationRepository) {
    this.repository = repository;
  }

  execute({ description, name }: IRequest) {
    const categoryAlreadyExists = this.repository.findByName(name);

    if (categoryAlreadyExists)
      throw new Error(`Category ''${name}'' already exists`);

    this.repository.create({ name, description });
  }
}
