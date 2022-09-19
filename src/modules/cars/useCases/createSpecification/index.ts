import SpecificationRepository from "../../repositories/implementations/specification.repository";
import CreateSpecificationController from "./CreateSpecificationController";
import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

const specificationRepository = SpecificationRepository.getInstance();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationRepository
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
);

export default createSpecificationController;
