import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  specificationAlreadyExists(car: Car, specifications_id: string[]) {
    let exists = false;

    specifications_id.forEach((id) => {
      exists = car.specifications?.some((s) => s.id === id);
    });

    return exists;
  }

  hasDuplicatedValues(specifications_id: string[]) {
    const specifications_idSet = new Set(specifications_id);
    return specifications_idSet.size !== specifications_id.length;
  }

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const car = await this.carsRepository.findById(car_id);

    if (!car)
      throw new AppError(`Car does not exists. ID ${car_id} not found.`);

    if (this.specificationAlreadyExists(car, specifications_id))
      throw new AppError(`Specification already exists.`);

    if (this.hasDuplicatedValues(specifications_id))
      throw new AppError(`Duplicated specifications are forbidden.`);
  }
}

export { CreateCarSpecificationUseCase };
