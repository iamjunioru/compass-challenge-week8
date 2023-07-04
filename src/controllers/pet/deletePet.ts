import { Request, Response } from "express";
import petRepository from "../../repositories/petRepository";

const deletePet = (req: Request, res: Response) => {
  try {
    const petId = req.params.petId;
    const tutorId = req.params.tutorId;

    petRepository.deletePet(petId, tutorId);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Error deleting pet.", error: error.message });
  }
};

export default deletePet;
