import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const createUserUseCase = container.resolve(CreateUserUseCase);
    const userData = request.body;
    await createUserUseCase.execute(userData);
    return response.status(201).send();
  }
}
