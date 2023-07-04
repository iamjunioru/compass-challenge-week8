import { Request, Response } from "express";
import tutorRepository from "../../repositories/tutorRepository";

const deleteTutor = (req: Request, res: Response) => {
  try {
    const tutorId = req.params.tutorId;
    tutorRepository.deleteTutor(tutorId);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

export default deleteTutor;
