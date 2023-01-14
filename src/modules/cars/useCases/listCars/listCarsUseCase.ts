import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IParams {
  brand?: string;
  category_id?: string;
  name?: string;
}

class ListCarsUseCase {
  constructor(private carsRepository: ICarsRepository) {}

  async execute(params: IParams) {
    const cars = await this.carsRepository.findAvailable(params);
    return cars;
  }
}

export { ListCarsUseCase };
