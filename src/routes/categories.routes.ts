import { Router } from "express";
import multer from "multer";

import createCategoryController from "../modules/cars/useCases/createCategory";
import importCategoryController from "../modules/cars/useCases/importCategory";
import listCategoriesController from "../modules/cars/useCases/listCategories";

const categoriesRoutes = Router();
const upload = multer({ dest: "./tmp" });

categoriesRoutes.post("/", (request, response) => {
  try {
    createCategoryController.handle(request, response);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  try {
    const categoriesList = listCategoriesController.handle(request, response);
    return response.status(200).json(categoriesList);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  try {
    importCategoryController.handle(request, response);
    return response.status(201).send();
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export { categoriesRoutes };
