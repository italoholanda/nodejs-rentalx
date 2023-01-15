import { Request, Response } from "express";
import { container } from "tsyringe";

import { IRequest as IListAvailableCarsParams } from "../createCar/createCarUseCase";
import { ListAvailableCarsUseCase } from "./listAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response) {
    const { brand, category_id, name } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const cars = await listAvailableCarsUseCase.execute({
      brand,
      category_id,
      name,
    } as IListAvailableCarsParams);

    return response.json(cars);
  }
}

export { ListAvailableCarsController };
