import "dotenv/config";

const PORT = parseInt(process.env.PORT as string);
const SECRET_JWT = process.env.SECRET_JWT as string;
const SALT = parseInt(process.env.SALT as string);
export { PORT, SECRET_JWT, SALT };
