import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { setupSwagger } from "./swaggerconfig";
import routes from "./routes/routes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://iamjunioru:iamjunioru@cluster0.j2i3zer.mongodb.net/mydatabase";

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as ConnectOptions)
  .then(() => {
    console.log("\x1b[32mConnected to MongoDB\x1b[0m");
    app.listen(port, () => {
      console.log("\x1b[32mServer running on port " + port + "\x1b[0m");
    });
  })
  .catch((error) => {
    console.error("\x1b[31mError connecting to MongoDB: \x1b[0m", error);
  });

setupSwagger(app);
app.use(express.json());

// Utiliza as rotas definidas em routes/routes.ts
app.use(routes);
