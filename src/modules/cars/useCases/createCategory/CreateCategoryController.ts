import { Request, Response } from "express";

import CreateCategoryUseCase from "./CreateCategoryUseCase";

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    await this.createCategoryUseCase.execute({ name, description });
    return response.status(201).send();
  }
}

export default CreateCategoryController;
