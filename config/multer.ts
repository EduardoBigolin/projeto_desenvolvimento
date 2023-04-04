import { randomUUID } from "crypto";
import multer from "multer";

export const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      return cb(null, "./public/upload");
    },
    filename: (req, file, cb) => {
      // remove spaces
      const name = file.originalname.split(" ").join("-");
      // get the file name your + . + type
      const fileName = `${randomUUID()}-${name}`;
      return cb(null, fileName);
    },
  }),
});
