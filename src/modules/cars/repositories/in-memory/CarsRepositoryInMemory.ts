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

    const isCarAvailable = (car: Car) => car.available;

    const checkName = (car: Car, name?: string) =>
      !name || car.name.toLowerCase() === name.toLowerCase();

    const checkBrand = (car: Car, brand?: string) =>
      !brand || car.brand.toLowerCase() === brand.toLowerCase();

    const checkCategory = (car: Car, category_id?: string) =>
      !category_id || car.category_id === category_id;

    return this.carList.filter(
      (car) =>
        isCarAvailable(car) &&
        checkName(car, name) &&
        checkBrand(car, brand) &&
        checkCategory(car, category_id)
    );
  }
}

export { CarsRepositoryInMemory };
