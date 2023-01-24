import { getRepository, Repository } from "typeorm";

import {
  ISpecificationRepository,
  ISpecificationDTO,
} from "../../../repositories/ISpecificationRepository";
import Specification from "../entities/Specification";

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

  async findByIds(ids: string[]) {
    const specifications: Specification[] = [];

    ids.filter(async (id) => {
      const specification = await this.repository.findOne(id);
      if (specification) specifications.push(specification);
    });

    return specifications;
  }
}

export default SpecificationRepository;
