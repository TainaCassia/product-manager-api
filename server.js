import express from "express";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import { db } from "./database/connection.js";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// usar as rotas
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello Node.js");
});

// conectar ao banco e iniciar servidor
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
    return;
  }
  console.log("Banco conectado com sucesso!");

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
