import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

export default class ImportCategoryUseCase {
  constructor(private repository: ICategoriesRepository) {
    this.repository = repository;
  }

  execute(file: Express.Multer.File | undefined) {
    if (!file) throw new Error("Missing file");

    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on("data", async (line) => {
      console.log(line);
    });

    console.log(file);
  }
}
