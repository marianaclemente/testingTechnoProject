<template>
     <section class="carrinho_modal" :class="{ativo: $store.state.carrinhoAtivo}" @click="clickForaCarrinho">
        <div class="carrinho_container">
            <button class="carrinho_fechar" @click="$store.state.carrinhoAtivo = false">X</button>
            <h2 class="carrinho_titulo">Carrinho</h2>
            <div>
                <ul class="carrinho_lista">
                    <li v-for="(item, index) in $store.state.carrinho" class="carrinho_item" :key="index">
                        <p>{{item.nome}}</p>
                        <p class="carrinho_preco">{{numeroPreco(item.preco)}}</p>
                        <button class="carrinho_remover" @click="removerItem(index)">X</button>
                    </li>
                </ul>
                <p class="carrinho_total">{{numeroPreco(carrinhoTotal)}}</p>
                <button class="carrinho_finalizar">Finalizar Compra</button>
            </div>
        </div>
    </section>
</template>

<script>
// import * as path from 'path'
//import axios from "axios"
import { mapState, mapMutations } from "vuex";
import numeroPreco from "@/api/mixins/numeroPreco.js";

export default {
    name: "Carrinho",
    props: ["id"],
    data() {
        return {
            //carrinhoAtivo: false,
        }
    },
    computed: {
        ...mapState(["produto", "carrinho", "totalCarrinho", "carrinhoAtivo"]),
        // produto(){
        //     return this.produto;
        // },
        carrinhoTotal() {
            let total = 0;
            if (this.carrinho.length) {
                this.carrinho.forEach(item => {
                    total += item.preco; 
                    this.$store.state.totalCarrinho = total;
    
                })
            }
            return total;
        }
    },
    mixins: [numeroPreco],
    methods: {
        ...mapMutations(["CHANGE_CARRINHO_ATIVO", "REMOVE_CARRINHO"]),
        clickForaCarrinho({ target, currentTarget }) {
            if (target === currentTarget) this.CHANGE_CARRINHO_ATIVO(false)
        },  
        removerItem(index) {
            this.REMOVE_CARRINHO(index)
            window.localStorage.carrinho = JSON.stringify(this.carrinho); 
        },
        compararEstoque() {
            const items = this.carrinho.filter(({ id }) => id === this.produto.id);
            this.$store.state.produto.estoque -= items.length;
        },
    }
}
</script>

<style scoped>
/* CARRINHO */

.carrinho_modal::before {
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    
}

 .carrinho_modal{
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 20px;
    display: none
}

.carrinho_modal.ativo {
    display: block;
}

.carrinho_container {
    position: relative;
    margin: 80px auto;
    background: #ffffff;
    padding: 40px;
    max-width: 800px;
    animation: fadeInDown .3s forwards;
}

.carrinho_item {
    display: grid;
    grid-template-columns: 1fr 1fr 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding: 10px 0;
}

.carrinho_titulo {
    margin-bottom: 10px;
    padding-bottom: 20px;
    border-bottom: 2px solid #000000;
}

.carrinho_remover {
    border: none;
    font-size: 1rem;
    cursor: pointer;
}

.carrinho_preco {
    text-align: right;
}

.carrinho_total {
    text-align: right;
    padding: 10px 50px 10px 0;
    margin-bottom: 20px;
    border-bottom: 2px solid #000;
}

.carrinho_fechar {
    border-radius: 50%;
    border: 2px solid #000;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 10px;
    right: -10px;
    font-size: 1rem;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, .1), 0px 4px 10px rgba(0, 0, 0, .2);
    cursor: pointer;
}

.carrinho_finalizar {
    display: block;
    margin-left: auto;
    background: #000;
    cursor: pointer;
    color: #ffffff;
    font-size: 1rem;
    padding: 10px 25px;
    border: none;
    font-family: "Noto Serif";
}

/* RESPONSIVO */

@media screen and (max-width: 900px) {
    .carrinho_modal {
        padding: 10px;
    }
}
</style>