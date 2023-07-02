import Tutor from '../models/tutorModel';
import Pet from '../models/petModel';

const tutorRepository = {
  async getAllTutors() {
    return Tutor.find().populate('pets');
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
      throw new Error('Não é possível excluir um tutor com pets associados.');
    }
    return Tutor.findByIdAndDelete(tutorId);
  },
};

export default tutorRepository;
