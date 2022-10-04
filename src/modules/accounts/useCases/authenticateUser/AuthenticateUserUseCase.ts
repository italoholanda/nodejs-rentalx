import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
export default class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error(`Email or password incorrect`);

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) throw new Error(`Email or password incorrect`);

    const token = sign({}, "b779fea8f8fb1099c007f8695a66df5b", {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    } as IResponse;
  }
}
