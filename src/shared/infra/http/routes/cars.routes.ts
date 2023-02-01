import { Router } from "express";
import multer from "multer";

import { uploadConfig } from "../../../../config/upload";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/createCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/createCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/listAvailableCarsController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/uploadCarImagesController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carRoutes = Router();

const createCarController = new CreateCarController();

const createCarSpecificationController = new CreateCarSpecificationController();

const listAvailableCarsController = new ListAvailableCarsController();

const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload("car-image"));

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.post(
  "/images",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.get(
  "/available",
  ensureAuthenticated,
  listAvailableCarsController.handle
);

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImagesController.handle
);

export { carRoutes };
