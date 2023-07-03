import { Schema, model, Document, Types } from "mongoose";

export interface Pet extends Document {
  name: string;
  species: string;
  carry: string;
  weight: number;
  date_of_birth?: Date;
  tutors: Types.ObjectId[];
}

const petSchema = new Schema<Pet>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  carry: { type: String, required: true },
  weight: { type: Number, required: true },
  date_of_birth: { type: Date },
  tutors: [{ type: Schema.Types.ObjectId, ref: "Tutor" }],
});

const PetModel = model<Pet>("Pet", petSchema);

export default PetModel;
