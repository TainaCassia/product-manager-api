// MODELO - SOMENTE ACESSO AO BANCO
import { db } from "../database/connection.js";

// CREATE
export async function createProduto({ nome_produto, categoria_produto, valor_produto, imagem }) {
  const query = `
    INSERT INTO produtos (nome_produto, categoria_produto, valor_produto, imagem)
    VALUES (?, ?, ?, ?)
  `;

  const [result] = await db.query(query, [
    nome_produto,
    categoria_produto,
    valor_produto,
    imagem
  ]);

  return result;
}

// READ
export async function getAllProdutos() {
  const [rows] = await db.query("SELECT * FROM produtos");
  return rows;
}

// UPDATE
export async function updateProduto(id, { nome_produto, categoria_produto, valor_produto, imagem }) {
  const query = `
    UPDATE produtos
    SET nome_produto = ?, categoria_produto = ?, valor_produto = ?, imagem = ?
    WHERE id_produto = ?
  `;

  const [result] = await db.query(query, [
    nome_produto,
    categoria_produto,
    valor_produto,
    imagem,
    id
  ]);

  return result;
}

// DELETE
export async function deleteProduto(id) {
  const query = "DELETE FROM produtos WHERE id_produto = ?";
  const [result] = await db.query(query, [id]);
  return result;
}
