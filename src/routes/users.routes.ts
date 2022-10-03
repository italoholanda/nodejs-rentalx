import { Router } from "express";

import { CreateUserController } from "../modules/accounts/repositories/useCases/createUser/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/", createUserController.handle);

export { userRoutes };
