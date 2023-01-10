import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { CreateCarUseCase, IRequest } from "./createCarUseCase";

class CreateCarController {
  argumentsAreMissing(request: IRequest) {
    if (!request.name || !request.license_plate) return true;
    return false;
  }

  async handle(request: Request, response: Response) {
    if (!request.body.name || !request.body.license_plate) {
      throw new AppError(
        "Missing arguments: 'name' and 'license plate' are required"
      );
    }

    const createCarUseCase: CreateCarUseCase =
      container.resolve(CreateCarUseCase);

    await createCarUseCase.execute(request.body);

    return response.status(201).send();
  }
}

export { CreateCarController };
