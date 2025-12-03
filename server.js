import express from "express";
import dotenv from "dotenv";
import produtoRoutes from "./routes/routesProduto.js";
import { db } from "./database/connection.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Resolver caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "public")));

// --------------------------
// ROTAS DAS PÁGINAS HTML
// --------------------------

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "views/html") });
});

app.get("/produtos", (req, res) => {
  res.sendFile("produtos.html", { root: path.join(__dirname, "views/html") });
});

app.get("/categorias", (req, res) => {
  res.sendFile("categorias.html", { root: path.join(__dirname, "views/html") });
});

app.get("/cadastro", (req, res) => {
  res.sendFile("cadastro.html", { root: path.join(__dirname, "views/html") });
});

// --------------------------
// ROTAS DA API (JSON)
// --------------------------


app.use("/api/produtos", produtoRoutes);


// --------------------------
// INICIAR SERVIDOR
// --------------------------

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
