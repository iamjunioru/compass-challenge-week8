import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import TutorModel from "../models/tutorModel";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const authService = {
  async authenticateUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // verificar as credenciais do usuário no banco de dados
      const tutor = await TutorModel.findOne({ email });

      if (tutor && tutor.password === password) {
        // hrar um token JWT
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid (Email or password)." });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error authenticating user. Please try again later.", error: error.message });
    }
  },
};

export default authService;
