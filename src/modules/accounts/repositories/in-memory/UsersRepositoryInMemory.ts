import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import User from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async emailAlreadyExists(email: string) {
    return Boolean(await this.findByEmail(email));
  }

  async create(userData: ICreateUserDTO): Promise<void> {
    if (await this.emailAlreadyExists(userData.email)) {
      throw new AppError("Email already exists");
    }

    const user = new User();

    Object.assign(user, { ...userData });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
