import { Request, Response } from "express";
import tutorRepository from "../../repositories/tutorRepository";

const updateTutor = (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    const tutorData = req.body;
    const updatedTutor = tutorRepository.updateTutor(tutorId, tutorData);
    res.status(200).json({ message: "Tutor successfully updated!" });
  } catch (error) {
    res.status(500).json({ message: "Error updating tutor.", error: error.message });
  }
};

export default updateTutor;
