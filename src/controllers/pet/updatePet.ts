import { Request, Response } from "express";
import petRepository from "../../repositories/petRepository";

const updatePet = async (req: Request, res: Response) => {
  try {
    const petId = req.params.petId;
    const tutorId = req.params.tutorId;
    const petData = req.body;

    const updatedPet = await petRepository.updatePet(petId, tutorId, petData);
    res.status(200).json({ message: "Pet successfully updated!", updatedPet });
  } catch (error) {
    res.status(500).json({ message: "Error updating pet.", error: error.message });
  }
};

export default updatePet;
