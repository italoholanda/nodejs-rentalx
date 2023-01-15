import { inject, injectable } from "tsyringe";

import { CarsRepository } from "../../infra/typeorm/repositories/cars.repository";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IParams {
  brand?: string;
  category_id?: string;
  name?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject(CarsRepository)
    private carsRepository: ICarsRepository
  ) {}

  async execute(params: IParams) {
    const cars = await this.carsRepository.findAvailable(params);
    return cars;
  }
}

export { ListCarsUseCase };
