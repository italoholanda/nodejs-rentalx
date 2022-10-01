import { Request, Response } from "express";

import ListCategoriesUseCase from "./ListCategoriesUseCase";

export default class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {
    this.listCategoriesUseCase = listCategoriesUseCase;
  }

  async handle(request: Request, response: Response) {
    const categoriesList = await this.listCategoriesUseCase.execute();
    return response.json(categoriesList);
  }
}
