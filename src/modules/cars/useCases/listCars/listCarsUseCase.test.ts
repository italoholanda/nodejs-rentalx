import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase, IRequest } from "../createCar/createCarUseCase";
import { ListCarsUseCase } from "./listCarsUseCase";

let carsRepository: ICarsRepository;

let listCarsUseCase: ListCarsUseCase;

const carList: IRequest[] = [
  {
    name: "Tiida",
    brand: "Nissan",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "1",
  },
  {
    name: "Cherry",
    brand: "Tiggo",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "1",
  },
  {
    name: "Towner",
    brand: "ASIA",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "1",
  },
  {
    name: "Golf",
    brand: "Volkswagen",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "1",
  },
  {
    name: "Camaro",
    brand: "Chevrolet",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "1",
  },
  {
    name: "C3",
    brand: "Citroën",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "1",
  },
  {
    name: "March",
    brand: "Nissan",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "xyz",
    category_id: "2",
  },
];

const handlePopulateRepository = async (carsRepository: ICarsRepository) => {
  carList.forEach(async (car) => {
    await carsRepository.create(car);
  });
};

describe("Car listing", () => {
  beforeEach(async () => {
    carsRepository = new CarsRepositoryInMemory();

    await handlePopulateRepository(carsRepository);

    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it("should be possible to list all the available cars", async () => {
    const useCaseCars: Car[] = await listCarsUseCase.execute();

    const isListEquals = useCaseCars.every(
      (car, index) => car.name === carList[index].name && car.available
    );

    expect(isListEquals).toBe(true);
  });

  it("should be possible to list all cars by category name", async () => {
    const SUVCar = carList.find((car) => car.name === "Tiggo");

    const useCaseCar: Car[] = await listCarsUseCase.execute({
      categoryName: "SUV",
    });

    expect(useCaseCar[0].name).toBe(SUVCar?.name);
  });

  it("should be possible to list all cars by manufactory name", async () => {
    const useCaseCars: Car[] = await listCarsUseCase.execute({
      brand: "Nissan",
    });

    const filteredCarList = carList.filter((car) => car.brand === "Nissan");

    const isListEquals = useCaseCars.every(
      (car, index) => car.name === filteredCarList[index].name
    );

    expect(isListEquals).toBe(true);
  });

  it("should be possible to list all cars by car name", async () => {
    const useCaseCars: Car[] = await listCarsUseCase.execute({
      name: "March",
    });

    const filteredCarList = carList.filter((car) => car.name === "March");

    const isListEquals = useCaseCars.every(
      (car, index) => car.name === filteredCarList[index].name
    );

    expect(isListEquals).toBe(true);
  });
});
