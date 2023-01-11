import { Repository, getRepository } from "typeorm";

import {
  ICarsRepository,
  ICreateCarDTO,
} from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<void> {
    const car = this.repository.create(data);
    await this.repository.save(car);
  }

  async findByName(name: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ name });
    return car;
  }

  async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ id });
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async list(): Promise<Car[]> {
    const carList = await this.repository.find();
    return carList;
  }
}

export { CarsRepository };
