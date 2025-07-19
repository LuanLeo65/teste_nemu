//src/routes/middlewares.ts
import { Request } from "express";
import multer from "multer";
import path from "path";

const uploadDir = path.resolve(__dirname, "../../uploads");
const workbook = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const ext = path.extname(file.originalname);
    const name = Date.now();
    const random = Math.floor(Math.random() * 10000);
    //Nome do arquivo contendo o nome, que captura a data/hora do momento, um numero aleatorio e a extensao, para nao correr risco de ter nomes iguais
    cb(null, `${name}-${random}${ext}`);
  },
});

const upload = multer({ storage: workbook });

export default upload;
