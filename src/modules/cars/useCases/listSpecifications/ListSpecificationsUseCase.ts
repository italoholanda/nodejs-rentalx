import { inject, injectable } from "tsyringe";

import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

@injectable()
export default class ListSpecifiactionsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute() {
    const specificationList = await this.specificationsRepository.list();
    return specificationList;
  }
}
