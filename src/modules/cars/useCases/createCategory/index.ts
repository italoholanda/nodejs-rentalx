import CategoriesRepository from "../../repositories/categories.repository";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

export default createCategoryUseCase;
