import {
  createProduto,
  getAllProdutos,
  updateProduto,
  deleteProduto
} from "../models/produtoModel.js";

// CREATE
export async function criarProduto(req, res) {
  try {
    const data = req.body;
    const result = await createProduto(data);

    res.status(201).json({
      message: "Produto criado com sucesso!",
      id_produto: result.insertId,
      data
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto", details: error });
  }
}

// READ
export async function listarProdutos(req, res) {
  try {
    const produtos = await getAllProdutos();
    res.status(200).json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar produtos", details: error });
  }
}

// UPDATE
export async function atualizarProdutos(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await updateProduto(id, data);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json({
      message: "Produto atualizado com sucesso!",
      data: { id, ...data }
    });

  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto", details: error });
  }
}

// DELETE
export async function deletarProduto(req, res) {
  try {
    const { id } = req.params;

    const result = await deleteProduto(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto deletado com sucesso!" });

  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto", details: error });
  }
}
