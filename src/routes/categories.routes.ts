import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (request, response) => {
  createCategoryController.handle(request, response);
  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categoriesList = listCategoriesController.handle(request, response);
  return response.status(200).json(categoriesList);
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  importCategoryController.handle(request, response);
  return response.status(201).send();
});

export { categoriesRoutes };
