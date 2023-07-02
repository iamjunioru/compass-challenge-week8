import { Schema, model, Document } from 'mongoose';

export interface Pet extends Document {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth: Date;
}

const petSchema = new Schema<Pet>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  carry: { type: String, required: true },
  weight: { type: Number, required: true },
  date_of_birth: { type: Date, required: true },
});

const PetModel = model<Pet>('Pet', petSchema);

export default PetModel;
