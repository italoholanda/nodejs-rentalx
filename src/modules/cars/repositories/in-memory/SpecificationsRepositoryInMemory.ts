import Specification from "../../infra/typeorm/entities/Specification";
import {
  ISpecificationDTO,
  ISpecificationRepository,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  private specifications: Specification[] = [];

  async create({ name, description }: ISpecificationDTO) {
    const specification = new Specification();
    Object.assign(specification, { name, description });
  }

  async findByName(name: string) {
    return this.specifications.find((spec) => spec.name === name);
  }

  async list() {
    return this.specifications;
  }

  async findByIds(ids: string[]) {
    return this.specifications.filter((spec) => ids.includes(spec.id));
  }
}

export { SpecificationsRepositoryInMemory };
