import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

let carsRepository: ICarsRepository;

describe("should be able to create a new car specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository
    );
  });

  it("should be possible to register a specification into a car", async () => {
    const car = {
      name: "Towner",
      brand: "ASIA",
      category_id: "1",
      daily_rate: 1000,
      description: "A very small van",
      fine_amount: 100,
      license_plate: "ABC-321",
    };

    await carsRepository.create(car);

    const registeredCar = await carsRepository.findByName("Towner");

    const car_id = `${registeredCar?.id}`;

    const specifications_id = ["4321"];

    await createCarSpecificationUseCase.execute({ car_id, specifications_id });
  });

  it("it must not be possible to register a specification to a not registered car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["4321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("it must not be possible to register duplicated specifications", async () => {
    expect(async () => {
      const car = {
        name: "Ka",
        brand: "Ford",
        category_id: "1",
        daily_rate: 1000,
        description: "A very smart car",
        fine_amount: 100,
        license_plate: "CBA-123",
      };

      await carsRepository.create(car);

      const registeredCar = await carsRepository.findByName("Ka");

      const car_id = `${registeredCar?.id}`;

      const specifications_id = ["4321", "4321"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
