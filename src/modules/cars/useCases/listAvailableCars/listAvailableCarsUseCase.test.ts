import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { IRequest } from "../createCar/createCarUseCase";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

let carsRepository: ICarsRepository;

let listAvailableCarsUseCase: ListAvailableCarsUseCase;

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
    license_plate: "sxp",
    category_id: "3",
  },
  {
    name: "Towner",
    brand: "ASIA",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "mrt",
    category_id: "1",
  },
  {
    name: "Golf",
    brand: "Volkswagen",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "akl",
    category_id: "1",
  },
  {
    name: "Camaro",
    brand: "Chevrolet",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "nbv",
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
    license_plate: "qgf",
    category_id: "2",
  },
  {
    name: "Tiida",
    brand: "Nissan",
    daily_rate: 100,
    description: "",
    fine_amount: 100,
    license_plate: "asd",
    category_id: "1",
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

    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be possible to list all the available cars", async () => {
    const useCaseCars: Car[] = await listAvailableCarsUseCase.execute({});

    const isListEquals = useCaseCars.every(
      (car, index) => car.name === carList[index].name && car.available
    );

    expect(isListEquals).toBe(true);
  });

  it("should be possible to list all cars by category id", async () => {
    const SUVCar = carList.find((car) => car.category_id === "3");

    const useCaseCar: Car[] = await listAvailableCarsUseCase.execute({
      category_id: SUVCar?.category_id,
    });

    expect(useCaseCar[0].name).toBe(SUVCar?.name);
  });

  it("should be possible to list all cars by manufactory name", async () => {
    const useCaseCars: Car[] = await listAvailableCarsUseCase.execute({
      brand: "SUV",
    });

    const filteredCarList = carList.filter((car) => car.brand === "Nissan");

    const isListEquals = useCaseCars.every(
      (car, index) => car.name === filteredCarList[index].name
    );

    expect(isListEquals).toBe(true);
  });

  it("should be possible to list all cars by car name", async () => {
    const useCaseCars: Car[] = await listAvailableCarsUseCase.execute({
      name: "March",
    });

    const filteredCarList = carList.filter((car) => car.name === "March");

    const isListEquals = useCaseCars.every(
      (car, index) => car.name === filteredCarList[index].name
    );

    expect(isListEquals).toBe(true);
  });

  it("should be possible to list all cars by car name, category_id and brand ", async () => {
    const useCaseCars: Car[] = await listAvailableCarsUseCase.execute({
      name: "March",
      category_id: "1",
      brand: "Nissan",
    });

    const filteredCarList = carList.filter(
      (car) =>
        car.name === "March" &&
        car.category_id === "1" &&
        car.brand === "Nissan"
    );

    const isListEquals = useCaseCars.every(
      (car, index) => car.license_plate === filteredCarList[index].license_plate
    );

    expect(isListEquals).toBe(true);
  });
});
