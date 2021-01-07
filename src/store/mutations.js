export default {
    CHANGE_CARRINHO_ATIVO(state, payload){
        state.carrinhoAtivo = payload
    },
    UPDATE_PRODUTO(state, payload){
    state.produto = payload
    },
    REMOVE_CARRINHO(state, index){
    state.carrinho.splice(index, 1);
    },
    PUSH_CARRINHO(state, payload){
    state.carrinho.push(payload);
    },
    DECREMENTA_ESTOQUE(state){
    state.produto.estoque--;
    },
    // updateProduto(state){
    //     console.log("item3")
    //     document.title = state.produto.nome || "Techno";
    //     const hash = state.produto.id || "";
    //     history.pushState(null, null, `#${hash}`);
        
    //     if (state.produto) {
    //         console.log("item2")
    //         this.compararEstoque();
    //     }
    // }
}