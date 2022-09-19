import { Router } from "express";

import CategoriesRepository from "../modules/cars/repositories/categories.repository";
import CreateCategoryService from "../modules/cars/useCases/createCategory/CreateCategoryUseCase";

const categoriesRoutes = Router();

const categoryRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  try {
    const service = new CreateCategoryService(categoryRepository);
    service.execute({ name, description });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();
  return response.status(200).json(categories);
});

export { categoriesRoutes };
