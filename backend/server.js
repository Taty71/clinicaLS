import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import profesionalRoutes from "./routes/profesionales.js";
import pacientesRoutes from "./routes/pacientes.js";


dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/profesionales", profesionalRoutes);
app.use("/api/pacientes", pacientesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});