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

      res.status(201).json({ message: "Pet successfully created!", newPet });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating pet.", error: error.message });
    }
  },

  async updatePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      const petData = req.body;
      const updatedPet = await petRepository.updatePet(petId, tutorId, petData);
      res.status(200).json({ message: "Pet successfully updated!", updatedPet });
    } catch (error) {
      res.status(500).json({ message: "Error updating pet.", error: error.message });
    }
  },
  

  deletePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      petRepository.deletePet(petId, tutorId);
      res.status(200).json({ message: "Pet successfully deleted!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting pet.", error: error.message });
    }
  },
};

export default petController;
