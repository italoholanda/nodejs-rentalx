import { Request, Response } from "express";

import CreateSpecificationUseCase from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {
    this.createSpecificationUseCase = createSpecificationUseCase;
  }

  handle(request: Request, response: Response) {
    const { name, description } = request.body;

    try {
      this.createSpecificationUseCase.execute({ name, description });
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export default CreateSpecificationController;
