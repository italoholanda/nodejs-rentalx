import CategoriesRepository from "../../repositories/implementations/categories.repository";
import ImportCategoryController from "./ImportCategoryController";
import ImportCategoryUseCase from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export default importCategoryController;
