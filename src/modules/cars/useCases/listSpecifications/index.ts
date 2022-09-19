import SpecificationRepository from "../../repositories/implementations/specification.repository";
import ListSpecificationsController from "./ListSpecificationsController";
import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

const specificationRepository = SpecificationRepository.getInstance();

const listSpecificationsUseCase = new ListSpecificationsUseCase(
  specificationRepository
);

const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsUseCase
);

export default listSpecificationsController;
