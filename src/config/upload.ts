import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const uploadConfig = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, "..", "..", "tmp"),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};

export { uploadConfig };
