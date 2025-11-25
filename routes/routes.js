import { Router } from "express";
import {
  criarUsuario,
  listarUsuarios,
  atualizarUsuario,
  deletarUsuario
} from "../controllers/usuarioController.js";

const router = Router();

router.post("/usuarios", criarUsuario);
router.get("/usuarios", listarUsuarios);
router.put("/usuarios/:id", atualizarUsuario);
router.delete("/usuarios/:id", deletarUsuario);

export default router;
