import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";
import listSpecificationsController from "../modules/cars/useCases/listSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
  try {
    createSpecificationController.handle(request, response);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }

  return response.status(201).send();
});

specificationRoutes.get("/", (request, response) => {
  const categories = listSpecificationsController.handle(request, response);
  return response.status(200).json(categories);
});

export { specificationRoutes };
