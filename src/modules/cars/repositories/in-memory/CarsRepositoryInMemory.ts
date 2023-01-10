import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../ICarsRepository";

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
}

export { CarsRepositoryInMemory };
