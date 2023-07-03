import { Request, Response } from "express";
import petRepository from "../repositories/petRepository";
import tutorRepository from "../repositories/tutorRepository";

const petController = {
  async createPet(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      const petData = req.body;

      const newPet = await petRepository.createPet(tutorId, petData);
      await tutorRepository.addPetToTutor(tutorId, newPet._id);

      res.status(201).json({ message: "Pet criado com sucesso", newPet });
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o pet", error: error.message });
    }
  },

  updatePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      const petData = req.body;
      const updatedPet = petRepository.updatePet(petId, tutorId, petData);
      res.status(updatedPet).json({ message: "Pet atualizado com sucesso", updatedPet });
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar o pet", error: error.message });
    }
  },

  deletePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      petRepository.deletePet(petId, tutorId);
      res.status(204).json({ message: "Pet deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar o pet", error: error.message });
    }
  },
};

export default petController;
