import { getRepository, Repository } from "typeorm";

import Specification from "../../entities/Specification";
import {
  ISpecificationRepository,
  ISpecificationDTO,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string) {
    const specification = await this.repository.findOne({ name });
    return specification;
  }

  async create({ name, description }: ISpecificationDTO) {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async list() {
    const specifications = await this.repository.find();
    return specifications;
  }
}

export default SpecificationRepository;
