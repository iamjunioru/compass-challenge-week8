import { Request, Response } from "express";
import tutorRepository from "../../repositories/tutorRepository";

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const tutors = await tutorRepository.getAllTutors();
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: "Error when searching tutors.", error: error.message });
  }
};

export default getAllTutors;
