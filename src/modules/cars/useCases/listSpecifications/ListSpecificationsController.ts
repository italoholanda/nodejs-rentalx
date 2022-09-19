import { Request, Response } from "express";

import ListSpecificationsUseCase from "./ListSpecificationsUseCase";

export default class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {
    this.listSpecificationsUseCase = listSpecificationsUseCase;
  }

  handle(request: Request, response: Response) {
    try {
      const specificationList = this.listSpecificationsUseCase.execute();
      return response.status(200).json(specificationList);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
