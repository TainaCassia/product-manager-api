import express from "express";
import {
  criarProduto,
  listarProdutos,
  atualizarProdutos,
  deletarProduto
} from "../controllers/produtoController.js";

const router = express.Router();

// Rotas CRUD
router.post("/", criarProduto);          // Criar produto
router.get("/", listarProdutos);         // Listar todos os produtos
router.put("/:id", atualizarProdutos);   // Atualizar produto
router.delete("/:id", deletarProduto);   // Deletar produto

export default router;

