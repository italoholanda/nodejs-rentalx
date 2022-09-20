import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";
import listSpecificationsController from "../modules/cars/useCases/listSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (request, response) => {
  createSpecificationController.handle(request, response);
  return response.status(201).send();
});

specificationRoutes.get("/", (request, response) => {
  const categories = listSpecificationsController.handle(request, response);
  return response.status(200).json(categories);
});

export { specificationRoutes };
