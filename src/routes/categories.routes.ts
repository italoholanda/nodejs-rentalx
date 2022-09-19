import { Router } from "express";

import CategoryRepository from "../repositories/categories.repository";

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoryRepository.findByName(name);

  if (categoryAlreadyExists)
    return response.status(400).json({ error: "Category already exists" });

  categoryRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = categoryRepository.list();
  return response.status(200).json(categories);
});

export { categoriesRoutes };
