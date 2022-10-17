import { Request, Response } from "express";
import { container } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UpdateAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatar_file = request.file?.filename;

    if (!avatar_file) throw new AppError("User avatar file not found");

    const updateUserAvatarUseCase = container.resolve(UpdateAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
