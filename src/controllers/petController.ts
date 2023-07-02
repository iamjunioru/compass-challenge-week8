import { Request, Response } from 'express';
import petRepository from '../repositories/petRepository';

const petController = {
  createPet(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      const petData = req.body;
      const newPet = petRepository.createPet(tutorId, petData);
      res.status(201).json(newPet);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o pet', error });
    }
  },

  updatePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      const petData = req.body;
      const updatedPet = petRepository.updatePet(petId, tutorId, petData);
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o pet', error });
    }
  },

  deletePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      petRepository.deletePet(petId, tutorId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar o pet', error });
    }
  },
};

export default petController;
