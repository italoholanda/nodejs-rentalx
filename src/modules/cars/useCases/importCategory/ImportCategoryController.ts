import { Request, Response } from "express";

import ImportCategoryUseCase from "./ImportCategoryUseCase";

class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  handle(request: Request, response: Response) {
    try {
      const { file } = request;
      this.importCategoryUseCase.execute(file);
      return response.status(201).send();
    } catch (err) {
      return response.status(400).json({ message: err.message });
    }
  }
}

export default ImportCategoryController;
