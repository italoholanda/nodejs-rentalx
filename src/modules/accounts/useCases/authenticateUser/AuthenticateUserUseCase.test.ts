import { AppError } from "../../../../errors/AppError";
import User from "../../infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let usersRepository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  const email = "email@example.com";
  const password = "password";

  beforeEach(async () => {
    usersRepository = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);

    const user: User = new User();

    Object.assign(user, {
      email,
      password,
    });

    await createUserUseCase.execute(user);
  });

  it("Should be able to authenticate", async () => {
    const res = await authenticateUserUseCase.execute(email, password);
    expect(res).toHaveProperty("token");
  });

  it("Should not be able to authenticate with invalid email", () => {
    expect(async () => {
      const email = "email2@example.com";

      await authenticateUserUseCase.execute(email, password);
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with invalid password", () => {
    expect(async () => {
      const password = "1234";

      await authenticateUserUseCase.execute(email, password);
    }).rejects.toBeInstanceOf(AppError);
  });
});
