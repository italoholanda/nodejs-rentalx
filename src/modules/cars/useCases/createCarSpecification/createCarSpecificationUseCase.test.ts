import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationsInMemory: ISpecificationRepository;

describe("Create car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsInMemory
    );
  });

  it("should be able to add a new specification to a existent car", async () => {
    carsRepositoryInMemory.create({
      name: "Towner",
      brand: "ASIA",
      category_id: "1",
      daily_rate: 1000,
      description: "A very small van",
      fine_amount: 100,
      license_plate: "ABC-321",
    });

    const car = await carsRepositoryInMemory.findByName("Towner");

    if (!car?.id) return;

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: ["54321"],
    });
  });

  it("should be able to add a list of specifications to a existent car", async () => {
    carsRepositoryInMemory.create({
      name: "Towner",
      brand: "ASIA",
      category_id: "1",
      daily_rate: 1000,
      description: "A very small van",
      fine_amount: 100,
      license_plate: "ABC-321",
    });

    const car = await carsRepositoryInMemory.findByName("Towner");

    if (!car?.id) return;

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: ["54321", "32412", "98672"],
    });
  });

  it("should not be able to add a new specification to a invalid car", async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: "123",
        specifications_id: ["54321"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
