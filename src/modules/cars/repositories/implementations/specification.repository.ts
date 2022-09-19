import Specification from "../../model/Specification";
import ISpecificationRepository, {
  ISpecificationDTO,
} from "../ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private categories: Specification[];

  constructor() {
    this.categories = [];
  }

  findByName(name: string) {
    return this.categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase()
    );
  }

  create({ name, description }: ISpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(specification);
  }

  list() {
    return this.categories;
  }
}

export default SpecificationRepository;
