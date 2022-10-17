import fs from "fs";

export const deleteFileIfExists = async (filename: string) => {
  try {
    await fs.promises.stat(filename);
  } catch {
    return false;
  }

  await fs.promises.unlink(filename);
  return true;
};
