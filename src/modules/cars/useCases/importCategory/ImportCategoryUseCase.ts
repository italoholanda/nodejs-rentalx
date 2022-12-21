import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

type MulterFile = Express.Multer.File;

@injectable()
export default class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private repository: ICategoriesRepository
  ) {}

  private categories: IImportCategory[] = [];

  private async categoryAlreadyExists(name: string) {
    const categoryFound = await this.repository.findByName(name);
    return Boolean(categoryFound);
  }

  private loadCategories(file: MulterFile): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = await line;
          this.categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(this.categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file?: MulterFile) {
    if (!file) throw new AppError("Missing file");
    const categories = await this.loadCategories(file);

    categories.forEach(async (category) => {
      if (await this.categoryAlreadyExists(category.name)) return;
      this.repository.create(category);
    });
  }
}
