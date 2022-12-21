import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    if (!name || !description) throw new AppError("missing category info", 400);

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export default CreateCategoryController;
