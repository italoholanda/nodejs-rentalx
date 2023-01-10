import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

class CreateCarUseCase {
  constructor(private carRrepository: ICarsRepository) {}

  async licensePlateAlreadyExists(licensePlate: string): Promise<boolean> {
    const car = await this.carRrepository.findByLicensePlate(licensePlate);
    return Boolean(car);
  }

  async execute(request: IRequest): Promise<void> {
    const alreadyExists = await this.licensePlateAlreadyExists(
      request.license_plate
    );

    if (alreadyExists) throw new AppError("License plate already exists");

    await this.carRrepository.create(request);
  }
}

export { CreateCarUseCase, IRequest };
