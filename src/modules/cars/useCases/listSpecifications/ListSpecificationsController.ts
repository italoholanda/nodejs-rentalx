import { Request, Response } from "express";
import { container } from "tsyringe";

import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

export default class ListSpecificationsController {
  async handle(request: Request, response: Response) {
    const listSpecificationsUseCase = container.resolve(
      ListSpecificationsUseCase
    );

    const specificationList = await listSpecificationsUseCase.execute();
    return response.status(200).json(specificationList);
  }
}
