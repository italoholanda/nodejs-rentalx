import { Request, Response } from "express";

import ImportCategoryUseCase from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  handle(request: Request, response: Response) {
    const { file } = request;
    this.importCategoryUseCase.execute(file);
    return response.status(201).send();
  }
}

export default ImportCategoryController;
