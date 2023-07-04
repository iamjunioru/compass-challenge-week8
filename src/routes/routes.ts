import express from "express";
import getAllTutors from "../controllers/tutor/getAllTutors";
import createTutor from "../controllers/tutor/createTutor";
import updateTutor from "../controllers/tutor/updateTutor";
import deleteTutor from "../controllers/tutor/deleteTutor";
import createPet from "../controllers/pet/createPet";
import updatePet from "../controllers/pet/updatePet";
import deletePet from "../controllers/pet/deletePet";
import authService from "../services/authService";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Rota pública sem autenticação
router.post("/auth", authService.authenticateUser);

// Rota sem autenticação
router.post("/tutor", createTutor);

// Middleware de autenticação
router.use(authMiddleware);

// Rotas autenticadas
router.get("/tutors", getAllTutors);
router.put("/tutor/:tutorId", updateTutor);
router.delete("/tutor/:tutorId", deleteTutor);
router.post("/pet/:tutorId", createPet);
router.put("/pet/:petId/tutor/:tutorId", updatePet);
router.delete("/pet/:petId/tutor/:tutorId", deletePet);

export default router;
