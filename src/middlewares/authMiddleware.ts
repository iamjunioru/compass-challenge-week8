import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Você pode adicionar informações do token decodificado ao objeto `req` para uso posterior, se necessário.
    req.tokenPayload = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

export default authMiddleware;
