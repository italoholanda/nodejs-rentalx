import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase, IRequest as ICar } from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be possible to register a new car", async () => {
    const car: ICar = {
      name: "Towner",
      brand: "ASIA",
      category_id: "1",
      daily_rate: 1000,
      description: "A very small van",
      fine_amount: 100,
      license_plate: "ABC-321",
    };

    await createCarUseCase.execute(car);

    expect(await carsRepository.findByName("Towner")).toHaveProperty("id");
  });

  it("it must not be possible to register multiple cars with the same line plate", async () => {
    expect(async () => {
      const car1: ICar = {
        name: "Civic",
        brand: "Honda",
        category_id: "1",
        daily_rate: 1000,
        description: "A very sporty car",
        fine_amount: 100,
        license_plate: "XYZ-123",
      };

      const car2: ICar = {
        name: "C3",
        brand: "Citroen",
        category_id: "2",
        daily_rate: 1000,
        description: "A very smart small car",
        fine_amount: 100,
        license_plate: "XYZ-123",
      };

      await createCarUseCase.execute(car1);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("cars must be registered with available status", async () => {
    const car: ICar = {
      name: "Towner",
      brand: "ASIA",
      category_id: "1",
      daily_rate: 1000,
      description: "A very small van",
      fine_amount: 100,
      license_plate: "ABC-321",
    };

    await createCarUseCase.execute(car);

    const registeredCar = await carsRepository.findByName("Towner");

    expect(registeredCar?.available).toBeTruthy();
  });
});
