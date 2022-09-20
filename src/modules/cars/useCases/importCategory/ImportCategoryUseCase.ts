import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

type MulterFile = Express.Multer.File;

export default class ImportCategoryUseCase {
  constructor(private repository: ICategoriesRepository) {
    this.repository = repository;
  }

  private categoryAlreadyExists(name: string) {
    return Boolean(this.repository.findByName(name));
  }

  private loadCategories(file: MulterFile): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = await line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file?: MulterFile) {
    if (!file) throw new Error("Missing file");
    const categories = await this.loadCategories(file);

    categories.forEach((category) => {
      if (this.categoryAlreadyExists(category.name)) return;
      this.repository.create(category);
    });
  }
}
