import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import tutorController from "./controllers/tutorController";
import petController from "./controllers/petController";
import authService from "./services/authService";
import authMiddleware from "./middlewares/authMiddleware";
import { setupSwagger } from "./swaggerconfig";

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

// rota pública sem autenticação
app.post("/auth", authService.authenticateUser);

// rota sem autenticação
app.post("/tutor", tutorController.createTutor);

// middleware de autenticação
app.use(authMiddleware);

// rotas autenticadas
app.get("/tutors", tutorController.getAllTutors);
app.put("/tutor/:tutorId", tutorController.updateTutor);
app.delete("/tutor/:tutorId", tutorController.deleteTutor);
app.post("/pet/:tutorId", petController.createPet);
app.put("/pet/:petId/tutor/:tutorId", petController.updatePet);
app.delete("/pet/:petId/tutor/:tutorId", petController.deletePet);
