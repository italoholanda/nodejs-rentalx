import { Car } from "../infra/typeorm/entities/Car";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;

  findByName(name: string): Promise<Car | undefined>;

  findById(id: string): Promise<Car | undefined>;

  findByLicensePlate(license_plate: string): Promise<Car | undefined>;

  list(): Promise<Car[]>;
}

export { ICarsRepository, ICreateCarDTO };
