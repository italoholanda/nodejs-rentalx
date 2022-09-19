import Specification from "../model/Specification";

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export default interface ISpecificationRepository {
  create({ name, description }: ISpecificationDTO): void;
  findByName(name: string): Specification | undefined;
  list(): Specification[];
}
