import { Router } from "express";

import SpecificationRepository from "../modules/cars/repositories/implementations/specification.repository";
import CreateSpecificationService from "../modules/cars/services/CreateSpecificationService";

const specificationRoutes = Router();

const specificationRepository = new SpecificationRepository();

specificationRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  try {
    const service = new CreateSpecificationService(specificationRepository);
    service.execute({ name, description });
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }

  return response.status(201).send();
});

specificationRoutes.get("/", (request, response) => {
  const categories = specificationRepository.list();
  return response.status(200).json(categories);
});

export { specificationRoutes };
