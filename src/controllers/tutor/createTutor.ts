import { Request, Response } from "express";
import tutorRepository from "../../repositories/tutorRepository";

const createTutor = (req: Request, res: Response) => {
  try {
    const tutorData = req.body;
    const newTutor = tutorRepository.createTutor(tutorData);
    res.status(201).json({ message: "Tutor successfully created!", newTutor, tutorData });
  } catch (error) {
    res.status(500).json({ message: "Error creating tutor.", error: error.message });
  }
};

export default createTutor;
