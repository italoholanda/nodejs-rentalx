import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  private async userAlreadyExists(data: ICreateUserDTO) {
    const user = await this.usersRepository.findByEmail(data.email);
    return Boolean(user);
  }

  async execute(data: ICreateUserDTO) {
    const passwordHash = await hash(data.password, 8);

    if (await this.userAlreadyExists(data))
      throw new AppError(`${data.email} already registered`);

    await this.usersRepository.create({ ...data, password: passwordHash });
  }
}
