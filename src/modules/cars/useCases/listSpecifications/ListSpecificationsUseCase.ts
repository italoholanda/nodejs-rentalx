import ISpecificationRepository from "../../repositories/ISpecificationRepository";

export default class ListSpecifiactionsUseCase {
  constructor(private specificationsRepository: ISpecificationRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  execute() {
    return this.specificationsRepository.list();
  }
}
