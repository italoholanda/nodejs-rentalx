import { Request, Response, NextFunction } from "express";

import UsersRepository from "../../../../modules/accounts/infra/typeorm/repositories/users.repository";
import { AppError } from "../../../errors/AppError";

const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user?.isAdmin) throw new AppError("User ins't admin.", 401);

  next();
};

export { ensureAdmin };
