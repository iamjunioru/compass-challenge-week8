import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import tutorController from './controllers/tutorController';
import petController from './controllers/petController';
import authService from './services/authService';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || 'mongodb+srv://iamjunioru:iamjunioru@cluster0.j2i3zer.mongodb.net/mydatabase';

mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

app.use(express.json());

// rotas
app.get('/tutors', tutorController.getAllTutors);
app.post('/auth', authService.authenticateUser);
app.post('/tutor', tutorController.createTutor);
app.put('/tutor/:id', tutorController.updateTutor);
app.delete('/tutor/:id', tutorController.deleteTutor);
app.post('/pet/:tutorId', petController.createPet);
app.put('/pet/:petId/tutor/:tutorId', petController.updatePet);
app.delete('/pet/:petId/tutor/:tutorId', petController.deletePet);

