// Modal Carrinho
const abrirModalCarrinho = document.querySelector("#abrirModalCarrinho");
const modalCarrinho = document.querySelector("#modalCarrinho");
const fecharModalCarrinho = document.querySelector("#fecharModalCarrinho");

abrirModalCarrinho.onclick = function () {
    modalCarrinho.showModal();
}

fecharModalCarrinho.onclick = function () {
    modalCarrinho.close();
}

// Modal Login
const abrirModalLogin = document.querySelector("#abrirModal");
const modalLogin = document.querySelector("#modal-login");
const fecharModalLogin = document.querySelector("#fecharModal")

abrirModalLogin.onclick = function () {
    modalLogin.show();
}

fecharModalLogin.onclick = function () {
    modalLogin.close();
}