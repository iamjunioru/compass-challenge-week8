import { Schema, model, Document, Types } from 'mongoose';
import Pet from './petModel';

export interface Tutor extends Document {
  name: string;
  password: string;
  phone: string;
  email: string;
  date_of_birth: Date;
  zip_code: string;
  pets: Types.ObjectId[];
}

const tutorSchema = new Schema<Tutor>({
  id: { type: Number, unique: true, get: (v: any) => Math.round(v), set: (v: any) => Math.round(v) },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  zip_code: { type: String, required: true },
  pets: [{ type: Schema.Types.ObjectId, ref: 'Pet' }],
});


const TutorModel = model<Tutor>('Tutor', tutorSchema);

export default TutorModel;
