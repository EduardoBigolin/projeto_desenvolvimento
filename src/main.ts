import { PORT } from "../config/environments";
import { Server } from "./Server";

const PORT_SERVER = PORT;
new Server().open(PORT_SERVER);
