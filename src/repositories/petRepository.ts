import Pet, { PetDocument } from "../models/petModel";
import Tutor, { TutorDocument } from "../models/tutorModel";

const petRepository = {
  async createPet(tutorId: string, petData: any): Promise<PetDocument> {
    const pet = new Pet(petData);
    pet.tutors.push(tutorId);
    await pet.save();
    return pet;
  },

  async updatePet(
    petId: string,
    tutorId: string,
    petData: any
  ): Promise<PetDocument | null> {
    const pet = await Pet.findOneAndUpdate(
      { _id: petId, tutors: tutorId },
      { $set: petData },
      { new: true }
    );
    return pet;
  },

  async deletePet(petId: string, tutorId: string): Promise<void> {
    await Pet.findOneAndDelete({ _id: petId, tutors: tutorId });
    await Tutor.findByIdAndUpdate(tutorId, { $pull: { pets: petId } });
  },
};

export default petRepository;
