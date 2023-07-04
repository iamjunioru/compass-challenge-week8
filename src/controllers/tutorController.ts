import { Request, Response } from "express";
import tutorRepository from "../repositories/tutorRepository";

const tutorController = {
  async getAllTutors(req: Request, res: Response) {
    try {
      const tutors = await tutorRepository.getAllTutors();
      res.json(tutors);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error when search tutors.", error: error.message });
    }
  },

  createTutor(req: Request, res: Response) {
    try {
      const tutorData = req.body;
      const newTutor = tutorRepository.createTutor(tutorData);
      res
        .status(201)
        .json({ message: "Tutor successfully created!", newTutor, tutorData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating tutor.", error: error.message });
    }
  },

  updateTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      const tutorData = req.body;
      const updatedTutor = tutorRepository.updateTutor(tutorId, tutorData);
      res
        .status(200)
        .json({
          message: "Tutor successfully updated!"
        });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating tutor.", error: error.message });
    }
  },

  deleteTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      tutorRepository.deleteTutor(tutorId);
      res.send(200).json();
    } catch (error) {
      res
        .send(500)
        .json();
    }
  },
};

export default tutorController;
