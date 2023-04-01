import express from "express";
import routes from "./routes";
import cors from "cors";
export class Server {
  public app = express();
  public open(PORT: number) {
    this.middleware();
    this.routes();
    this.app.listen(PORT, () => {
      console.log(`
        [HTTP] your server is listen at http://localhost:${PORT}/api/v1/
      `);
    });
  }
  public middleware() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  public routes() {
    this.app.use("/api/v1", routes);
  }
}
