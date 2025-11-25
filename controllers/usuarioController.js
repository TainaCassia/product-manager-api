import { db } from "../database/connection.js";

// CREATE
export async function criarUsuario(req, res) {
  try {
    const { email, nome, idade } = req.body;

    const query = "INSERT INTO cliente (email, nome, idade) VALUES (?, ?, ?)";
    await db.promise().query(query, [email, nome, idade]);

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      data: { email, nome, idade }
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário", details: error });
  }
}

// READ
export async function listarUsuarios(req, res) {
  try {
    const [rows] = await db.promise().query("SELECT * FROM cliente");
    res.status(200).json(rows);

  } catch (error) {
    res.status(500).json({ error: "Erro ao listar usuários", details: error });
  }
}

// UPDATE
export async function atualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { email, nome, idade } = req.body;

    const query = `
      UPDATE cliente 
      SET email = ?, nome = ?, idade = ?
      WHERE id = ?
    `;

    const [result] = await db.promise().query(query, [
      email,
      nome,
      idade,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      data: { id, email, nome, idade },
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error });
  }
}

// DELETE
export async function deletarUsuario(req, res) {
  try {
    const { id } = req.params;

    const query = "DELETE FROM cliente WHERE id = ?";
    const [result] = await db.promise().query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso!" });

  } catch (error) {
    res.status(500).json({
      error: "Erro ao deletar usuário",
      details: error,
    });
  }
}
