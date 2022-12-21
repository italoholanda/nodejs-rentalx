import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

let categoriesRepository: CategoriesRepositoryInMemory;

let createCategoryUseCase: CreateCategoryUseCase;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepository = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  });

  it("should be able to create a new car category", async () => {
    const category = {
      name: "SUV",
      description: "utility sports car",
    };

    await createCategoryUseCase.execute(category);

    const createdCategory = await categoriesRepository.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create two categories with the same name", async () => {
    expect(async () => {
      const category = {
        name: "SUV",
        description: "utility sports car",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
