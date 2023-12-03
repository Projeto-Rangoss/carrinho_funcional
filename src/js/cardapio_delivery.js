// CARRINHO
var valorTotal = "0,00";

const removeProdutosBtn = document.getElementsByClassName("btnRemoverProduto");

// Função para remover produto do carrinho ao clicar no botão indicado
function removerProduto(event) {
    // Percorre todos os botões desse tipo que existem no carrinho e, ao clique desse botão em um produto 
    // a linha da tabela carrinho relacionada a esse produto e suas informações é removida 
    for (var i = 0; i < removeProdutosBtn.length; i++) {
        removeProdutosBtn[i].addEventListener("click", function (event) {
            const targetEl = event.target;
            const parentEl = targetEl.closest("tr");
            parentEl.remove();
            // Após remover um item o carrinho é atualizado
            atualizarCarrinho();
        })
    }
}
// Chamada da função quando necessário
removerProduto();

// Ao aumentar o diminuir a quantidade de cada produto chama uma função
const quantidadeProdutos = document.getElementsByClassName("inputQtdProdutos");
for (var i = 0; i < quantidadeProdutos.length; i++) {
    quantidadeProdutos[i].addEventListener("change", verificarSeInputENulo);
}





const botaoFinalizar = document.getElementsByClassName("btnFinalizar")[0]
botaoFinalizar.addEventListener("click", finalizarCompra)

// Ao clicar no botão para finalizar a compra, verifica se o carrinho está vazio, ou seja, se o valor total está zerado
function finalizarCompra() {
    if (valorTotal === "0,00") {
        // Se estiver vazio, imprime uma mensagem
        console.log("Seu carrinho está vazio!")
    } else {
        // Se houver produtos no carrinho, realiza as próximas ações para finalizar a compra
        document.querySelector(".tabelaCarrinho tbody").innerHTML = "";
        atualizarCarrinho()
    }
}

// Caso um produto no carrinho estiver com a sua quantidade zerada, ele é removido e o carrinho atualizado
function verificarSeInputENulo(event) {
    if (event.target.value === "0") {
        const targetEl = event.target;
        const parentEl = targetEl.closest("tr");
        parentEl.remove();
    }


    atualizarCarrinho();

}

// Ao clique do botão de um produto no carrinho chama uma função para adicioná-lo ao carrinho
const addAoCarrinhoBtn = document.getElementsByClassName("btnCard");
for (var i = 0; i < addAoCarrinhoBtn.length; i++) {
    addAoCarrinhoBtn[i].addEventListener("click", adicionarProdutoCarrinho)
}

// Função para adicionar um porduto do cardápio ao carrinho
function adicionarProdutoCarrinho(event) {
    const button = event.target;
    const infosProduto = button.closest(".containerCard");
    // Obtém o caminho da imagem do card do produto
    const imagemProduto = infosProduto.getElementsByClassName("imgCard")[0].src;
    // Obtém o título do card do produto
    const nomeProduto = infosProduto.getElementsByClassName("tituloCard")[0].innerText;
    // Obtém o preço do card do produto
    const precoProduto = infosProduto.getElementsByClassName("precoProdutoBtn")[0].innerText;

    // Obtém o título de cada produto que já está no carrinho
    const nomesProdutosCarrinho = document.getElementsByClassName("tituloProdutoCarrinho");
    // Compara cada produto do carrinho com os produtos do cardápio de acordo com seus títulos
    for (var i = 0; i < nomesProdutosCarrinho.length; i++) {
        if (nomesProdutosCarrinho[i].innerText === nomeProduto) {
            const parentElement = nomesProdutosCarrinho[i].closest(".produtoCarrinho");
            const inputQtdProduto = parentElement.getElementsByClassName("inputQtdProdutos")[0];
            // Se haver um produto no carrinho e o cliente adicioná-lo de novo, a única mudança será que a quantidade do produto no carrinho vai aumentar em 1 e atualiza o carrinho
            inputQtdProduto.value++;
            atualizarCarrinho();
            return;
        }
    }


    //Adicionar um produto novo ao carrinho
    // Cria um elemento de linha no corpo da tabela do carrinho
    let newCartProduct = document.createElement("tr");
    // Adiciona uma classe a essa linha
    newCartProduct.classList.add("produtoCarrinho");
    // Insere a formatação de um elemento com o nome, a imagem e o preço do produto a ser adicionado de forma concatenada
    newCartProduct.innerHTML = `
    <td class="identificacaoProduto">
        <h3 class="tituloProdutoCarrinho">${nomeProduto}</h3>
        <img src="${imagemProduto}" class="imgProdutoCarrinho" alt="Imagem ${nomeProduto}">
        
</td>
<td class="precoProdutoCarrinho">${precoProduto}</td>
<td><input type="number" min="0" value="1" class="inputQtdProdutos">
<button class="btnRemoverProduto"><span class="material-symbols-outlined iconeRemoverProduto">
close
</span></button></td>`

    // Insere essa linha no corpo da tabela e atualiza o carrinho
    const tableBody = document.querySelector(".tabelaCarrinho tbody");
    tableBody.append(newCartProduct);
    atualizarCarrinho();

    // Ao mudar a quantidade de um produto ou removê-lo do carrinho, chama-se as funções necessárias
    newCartProduct.getElementsByClassName("inputQtdProdutos")[0].addEventListener("change", verificarSeInputENulo)
    newCartProduct.getElementsByClassName("btnRemoverProduto")[0].addEventListener("click", removerProduto);

}



// Obtém os valores dos produtos do carrinho de acordo com sua quantidade e os soma para imprimir o valor total
function atualizarCarrinho() {
    // Define o valor total como zero, pois ainda vão ser adicionados valores a ele
    valorTotal = 0;
    const carrinhoProdutos = document.getElementsByClassName("produtoCarrinho");
    // PErcorre todos os produtos do carrinho
    for (var i = 0; i < carrinhoProdutos.length; i++) {
        // Obtém o preço de cada produto do carrinho e retina o "R$" e substitui a "," por "."
        const produtoPreco = carrinhoProdutos[i].getElementsByClassName("precoProdutoCarrinho")[0].innerText.replace("R$", "").replace(",", ".");
        // Obtém o valor da quantidade de produtos
        const produtoQuantidade = carrinhoProdutos[i].getElementsByClassName("inputQtdProdutos")[0].value;
        // Multiplica o preço do produto e quantidade e o guarda na variável valorTotal
        valorTotal += produtoPreco * produtoQuantidade;

    }
    // Define que o número terpa apenas duas casas decimais, o formata para ter "," ao invés de "." para exibí-lo na tela com o "R$"
    valorTotal = valorTotal.toFixed(2);
    valorTotal = valorTotal.replace(".", ",");
    document.querySelector(".precoTotal").innerText = " R$ " + valorTotal;

}





// PAGINAÇÃO
const botaoCardapio = document.querySelectorAll('.botaoMenu');
const conteudo = document.querySelectorAll('.menu');



// estrutura para executar as funções e adicionar um numero no index pra ir passando proximo a proximo( foreach )
botaoCardapio.forEach((botaoMenu, indice) => {
    botaoMenu.addEventListener('click', () => {
        desativarBotaoSelecionado();

        selecionarBotaoCardapio(botaoMenu);

        esconderConteudo();

        mostrarConteudo(indice);

    })
})


// Criando as funções para ser chamadas na estrutura

function mostrarConteudo(indice) {
    conteudo[indice].classList.add('ativa');

}

function selecionarBotaoCardapio(botaoMenu) {
    botaoMenu.classList.add('selecionado');
}

function esconderConteudo() {
    const conteudoAtivo = document.querySelector('.ativa');
    conteudoAtivo.classList.remove('ativa');
}

function desativarBotaoSelecionado() {
    const botaoSelecionado = document.querySelector('.selecionado');
    botaoSelecionado.classList.remove('selecionado')
}



// BARRA DE PESQUISA
const inputSearch = document.getElementById("pesquisarPratos");
const cardItens = document.querySelectorAll(".containerCard");

// Chama a função pesquisarPratos() ao usar o campo input
inputSearch.addEventListener("input", pesquisarPratos)

function pesquisarPratos() {

    // sempre que o campo é preenchido o for é executado para comparar o valor preenchido no input com o título de cada card do cardápio
    if (inputSearch.value != "") {
        for (let card of cardItens) {
            let nomePrato = card.querySelector("h2");
            //para isso o texto digitado no input e o título do cartão são transformados para letras minúsculas
            nomePrato = nomePrato.textContent.toLowerCase();
            let searchText = inputSearch.value.toLowerCase();
            // os cards que não têm o título compatíveis com o texto do input somem
            if (!nomePrato.includes(searchText)) {
                card.style.display = "none";
            } else {
                // os cards que têm o título compatíveis com o texto do input ficam à mostra
                card.style.display = "grid";
            }
        }
    }
    // caso nada for digitado no campo input de pesquisa, todos os cards são exibidos
    else {
        for (let card of cardItens) {
            card.style.display = "grid";
        }
    }
}


