import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

export default class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const usersUseCase = container.resolve(AuthenticateUserUseCase);
    const { email, password } = request.body;
    const responseData = await usersUseCase.execute(email, password);

    return response.json(responseData);
  }
}
