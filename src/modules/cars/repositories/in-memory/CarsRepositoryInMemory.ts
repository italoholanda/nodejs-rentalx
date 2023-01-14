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

    const checkRequiredParam = (
      car: Car,
      key: keyof Car,
      value?: Car[keyof Car]
    ) => {
      if (!value) return true;

      const carValue = car[key];

      if (typeof carValue === "string" && typeof value === "string") {
        return carValue.toLowerCase() === value.toLowerCase();
      }

      return false;
    };

    return this.carList.filter(
      (car) =>
        car.available &&
        checkRequiredParam(car, "category_id", category_id) &&
        checkRequiredParam(car, "name", name) &&
        checkRequiredParam(car, "brand", brand)
    );
  }
}

export { CarsRepositoryInMemory };
