import * as dotenv from "dotenv";
import { createServer } from "./express.server";

dotenv.config();
const port = process.env.PORT;

const app = createServer(); // RETORNA O APP = Express

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});
