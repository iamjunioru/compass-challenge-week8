/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         species:
 *           type: string
 *         carry:
 *           type: string
 *         weight:
 *           type: number
 *       required:
 *         - name
 *         - species
 *         - carry
 *         - weight
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       required:
 *         - message
 */

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: API de gerenciamento de pets
 */

/**
 * @swagger
 * /pet/{tutorId}:
 *   post:
 *     summary: Cria um novo pet para um tutor
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: tutorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do tutor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       500:
 *         description: Erro ao criar o pet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */



import { Request, Response } from "express";
import petRepository from "../repositories/petRepository";
import tutorRepository from "../repositories/tutorRepository";

const petController = {
  async createPet(req: Request, res: Response) {
    try {
      const tutorId = req.params.tutorId;
      const petData = req.body;

      const newPet = await petRepository.createPet(tutorId, petData);
      await tutorRepository.addPetToTutor(tutorId, newPet._id);

      res.status(201).json(newPet);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o pet", error: error.message });
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
      res.status(500).json({ message: "Erro ao atualizar o pet", error: error.message });
    }
  },

  deletePet(req: Request, res: Response) {
    try {
      const petId = req.params.petId;
      const tutorId = req.params.tutorId;
      petRepository.deletePet(petId, tutorId);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro ao deletar o pet", error: error.message });
    }
  },
};

export default petController;
