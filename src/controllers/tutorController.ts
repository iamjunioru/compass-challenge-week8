import { Request, Response } from 'express';
import tutorRepository from '../repositories/tutorRepository';

const tutorController = {
  async getAllTutors(req: Request, res: Response) {
    try {
      const tutors = await tutorRepository.getAllTutors();
      res.json(tutors);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar os tutores', error });
    }
  },

  createTutor(req: Request, res: Response) {
    try {
      const tutorData = req.body;
      const newTutor = tutorRepository.createTutor(tutorData);
      res.status(201).json({ message: 'Tutor Criado', newTutor, tutorData });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o tutor', error: error.message});
    }
  },

  updateTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.id;
      const tutorData = req.body;
      const updatedTutor = tutorRepository.updateTutor(tutorId, tutorData);
      res.json(updatedTutor);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o tutor', error });
    }
  },

  deleteTutor(req: Request, res: Response) {
    try {
      const tutorId = req.params.id;
      tutorRepository.deleteTutor(tutorId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar o tutor', error });
    }
  },
};

export default tutorController;
