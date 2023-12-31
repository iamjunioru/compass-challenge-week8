import Tutor from "../models/tutorModel";

const tutorRepository = {
  async getAllTutors() {
    return Tutor.find().populate("pets").exec();
  },

  async createTutor(tutorData: any) {
    const lastTutor = await Tutor.findOne().sort({ id: -1 }).limit(1);
    const lastId = lastTutor ? lastTutor.id : 0;
    const newId = lastId + 1;

    const tutor = new Tutor({ ...tutorData, id: newId });
    const createdTutor = await tutor.save();

    return createdTutor;
  },

  async updateTutor(tutorId: string, tutorData: any) {
    return Tutor.findByIdAndUpdate(tutorId, tutorData, { new: true });
  },

  async deleteTutor(tutorId: string) {
    const tutor = await Tutor.findById(tutorId);
    if (tutor.pets.length > 0) {
      return { error: "Não é possível excluir um tutor com pets associados." };
    }
    return Tutor.findByIdAndDelete(tutorId);
  },

  async addPetToTutor(tutorId: string, petId: string) {
    return Tutor.findByIdAndUpdate(
      tutorId,
      { $push: { pets: petId } },
      { new: true }
    );
  },
};

export default tutorRepository;
