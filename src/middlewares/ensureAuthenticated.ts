import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import UsersRepository from "../modules/accounts/repositories/implementations/users.repository";

interface IVerifyResponse {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("Token missing from request");

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "b779fea8f8fb1099c007f8695a66df5b"
    ) as IVerifyResponse;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (user) next();
    else throw new Error("User not found");
    next();
  } catch {
    throw new Error("Invalid token");
  }
}
