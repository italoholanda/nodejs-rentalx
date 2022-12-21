import { container } from "tsyringe";

import UsersRepository from "../../modules/accounts/infra/typeorm/repositories/users.repository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import CategoriesRepository from "../../modules/cars/infra/typeorm/repositories/categories.repository";
import SpecificationRepository from "../../modules/cars/infra/typeorm/repositories/specification.repository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
