/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - species
 *         - carry
 *         - weight
 *       properties:
 *         name:
 *           type: string
 *           description: Nome do pet
 *         species:
 *           type: string
 *           description: Espécie do pet
 *         carry:
 *           type: string
 *           description: Porte do pet
 *         weight:
 *           type: number
 *           description: Peso do pet
 *         date_of_birth:
 *           type: string
 *           format: date
 *           description: Data de nascimento do pet (opcional)
 *         tutors:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de IDs de tutores associados ao pet
 */

// Resto do código do petModel


import { Schema, model, Document, Types } from "mongoose";

export interface Pet extends Document {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth?: Date;
  tutors: Types.ObjectId[]; // Adicione essa linha
}

const petSchema = new Schema<Pet>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  carry: { type: String, required: true },
  weight: { type: Number, required: true },
  date_of_birth: { type: Date },
  tutors: [{ type: Schema.Types.ObjectId, ref: "Tutor" }], // Adicione essa linha
});

const PetModel = model<Pet>("Pet", petSchema);

export default PetModel;
