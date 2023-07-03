import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import tutorController from "./controllers/tutorController";
import petController from "./controllers/petController";
import authService from "./services/authService";
import authMiddleware from "./middlewares/authMiddleware";
import { setupSwagger } from "./swagger.ts";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://iamjunioru:iamjunioru@cluster0.j2i3zer.mongodb.net/mydatabase";

mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
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



