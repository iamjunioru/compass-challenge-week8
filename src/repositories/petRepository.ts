import PetModel from "../models/petModel";
import TutorModel from "../models/tutorModel";

const petRepository = {
  async createPet(tutorId: string, petData: any) {
    const tutor = await TutorModel.findById(tutorId);
    const newPet = await PetModel.create(petData);
    tutor.pets.push(newPet);
    await tutor.save();
    return newPet;
  },

  async updatePet(petId: string, tutorId: string, petData: any) {
    const tutor = await TutorModel.findById(tutorId);
    const pet = await PetModel.findByIdAndUpdate(petId, petData, { new: true });
    return pet;
  },

  async deletePet(petId: string, tutorId: string) {
    const tutor = await TutorModel.findById(tutorId);
    tutor.pets.pull(petId);
    await tutor.save();
    return PetModel.findByIdAndDelete(petId);
  },
};

export default petRepository;
