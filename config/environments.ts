import "dotenv/config";

const PORT = parseInt(process.env.PORT as string);
const SECRET_JWT = process.env.SECRET_JWT as string;

export { PORT, SECRET_JWT };
