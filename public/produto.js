// ======= CARREGAR PRODUTOS NA TELA =======
async function carregarProdutos() {
    const lista = document.getElementById("lista-produtos");
    lista.innerHTML = "<p>Carregando...</p>";

    try {
        const resposta = await fetch("/api/produtos");
        const produtos = await resposta.json();

        lista.innerHTML = "";

        produtos.forEach(prod => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <span class="product-id">ID: ${prod.id_produto}</span>

                <div class="product-image">
                    <img src="${prod.imagem}" alt="${prod.nome_produto}">
                </div>

                <div class="product-info">
                    <h3>${prod.nome_produto}</h3>
                    <p>Categoria: ${prod.categoria_produto}</p>
                    <p class="product-price">R$ ${Number(prod.valor_produto).toFixed(2)}</p>
                </div>

                <button class="btn-edit" onclick="abrirModal(
                    ${prod.id_produto},
                    '${prod.nome_produto}',
                    '${prod.categoria_produto}',
                    ${prod.valor_produto},
                    '${prod.imagem}'
                )">Editar</button>

                <button class="btn-delete" onclick="deletarProduto(${prod.id_produto})">
                    Deletar
                </button>
            `;

            lista.appendChild(card);
        });

    } catch (erro) {
        console.log("Erro ao carregar produtos:", erro);
        lista.innerHTML = "<p>Erro ao carregar produtos.</p>";
    }
}


// ======= CADASTRAR PRODUTO =======
document.getElementById("form-cadastro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const novoProduto = {
        nome_produto: document.getElementById("nome").value,
        categoria_produto: document.getElementById("categoria").value,
        valor_produto: document.getElementById("valor").value,
        imagem: document.getElementById("imagem").value
    };

    try {
        const resposta = await fetch("/api/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoProduto)
        });

        if (resposta.ok) {
            alert("Produto cadastrado!");
            e.target.reset();
            carregarProdutos();
        } else {
            alert("Erro ao cadastrar produto.");
        }

    } catch (erro) {
        console.log("Erro ao cadastrar:", erro);
    }
});


// ======= DELETAR PRODUTO =======
async function deletarProduto(id) {
    if (!confirm("Deseja realmente excluir este produto?")) return;

    try {
        const resposta = await fetch(`/api/produtos/${id}`, {
            method: "DELETE"
        });

        if (resposta.ok) {
            alert("Produto excluído!");
            carregarProdutos();
        } else {
            alert("Erro ao excluir.");
        }

    } catch (erro) {
        console.log("Erro ao deletar:", erro);
    }
}


// ======= MODAL DE EDIÇÃO =======
function abrirModal(id, nome, categoria, valor, imagem) {
    document.getElementById("edit-id").value = id;
    document.getElementById("edit-nome").value = nome;
    document.getElementById("edit-categoria").value = categoria;
    document.getElementById("edit-valor").value = valor;
    document.getElementById("edit-imagem").value = imagem;

    document.getElementById("modal-edicao").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal-edicao").style.display = "none";
}


// ======= SALVAR EDIÇÃO =======
async function salvarEdicao(e) {
    e.preventDefault();

    const id = document.getElementById("edit-id").value;
    const nome = document.getElementById("edit-nome").value;
    const categoria = document.getElementById("edit-categoria").value;
    const valor = document.getElementById("edit-valor").value;
    const imagem = document.getElementById("edit-imagem").value;

    const produtoAtualizado = {
        nome_produto: nome,
        categoria_produto: categoria,
        valor_produto: valor,
        imagem: imagem
    };

    const resposta = await fetch(`/api/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoAtualizado)
    });

    if (resposta.ok) {
        alert("Produto atualizado!");
        carregarProdutos();
        fecharModal();
    } else {
        alert("Erro ao atualizar produto!");
    }
}


// ======= INICIALIZAÇÃO =======
carregarProdutos();
