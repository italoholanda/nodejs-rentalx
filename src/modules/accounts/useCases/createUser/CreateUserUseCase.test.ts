import { AppError } from "../../../../errors/AppError";
import User from "../../infra/typeorm/entities/User";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: IUsersRepository;

let createUserUseCase: CreateUserUseCase;

describe("Create user", () => {
  beforeEach(() => {
    usersRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = new User();

    Object.assign(user, {
      name: "John Doe",
      avatar: "http://example.com/avatar.jpg",
      created_at: new Date(),
      driverLicense: "123-456-789",
      email: "john@example.com",
      password: "password",
    });

    await createUserUseCase.execute(user);

    expect(usersRepository.findById(user.id)).toBeTruthy();
  });

  it("should not be able to create two users with the same e-mail", async () => {
    expect(async () => {
      const user = new User();

      Object.assign(user, {
        name: "Ana Barr",
        avatar: "http://example.com/avatar.jpg",
        created_at: new Date(),
        driverLicense: "123-456-789",
        email: "ana@example.com",
        password: "password",
      });

      await createUserUseCase.execute(user);

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
