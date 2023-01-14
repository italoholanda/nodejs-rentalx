import { Car } from "../../infra/typeorm/entities/Car";
import {
  ICarsRepository,
  ICreateCarDTO,
  IFindAvailableArgs,
} from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private carList: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, data);
    this.carList.push(car);
  }

  async findByName(name: string): Promise<Car | undefined> {
    return this.carList.find((car) => car.name === name);
  }

  async findById(id: string): Promise<Car | undefined> {
    return this.carList.find((car) => car.id === id);
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.carList.find((car) => car.license_plate === license_plate);
  }

  async list(): Promise<Car[]> {
    return this.carList;
  }

  async findAvailable(args: IFindAvailableArgs): Promise<Car[]> {
    const { category_id, name, brand } = args;

    return this.carList
      .filter((car) => car.available)
      .filter((car) => !category_id || car.category_id === category_id)
      .filter((car) => !name || car.name.toLowerCase() === name.toLowerCase())
      .filter(
        (car) => !brand || car.brand.toLowerCase() === brand.toLowerCase()
      );
  }
}

export { CarsRepositoryInMemory };
