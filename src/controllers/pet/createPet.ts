import { Request, Response } from "express";
import petRepository from "../../repositories/petRepository";
import tutorRepository from "../../repositories/tutorRepository";

const createPet = async (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    const petData = req.body;

    const newPet = await petRepository.createPet(tutorId, petData);
    await tutorRepository.addPetToTutor(tutorId, newPet._id);

    res.status(201).json({ message: "Pet successfully created!", newPet });
  } catch (error) {
    res.status(500).json({ message: "Error creating pet.", error: error.message });
  }
};

export default createPet;
