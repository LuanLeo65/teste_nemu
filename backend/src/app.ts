//src/app.ts
import express from "express";
import routes from "./routes/routes";
import cors from 'cors'

const app = express();

app.use(cors({
    origin: "http://localhost:5173"
  }))

app.use(express.json());
app.use(routes);

export default app;
