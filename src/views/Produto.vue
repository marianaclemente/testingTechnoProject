<template>
    <div>
        <section class="modal" v-if="produto" @click="fecharModal">
            <!-- <Alerta v-if= "$store.state.alertaAtivo" /> -->
            <div class="modal_container">
                <div class="modal_img">
                    <img :src="getURL(produto.id)" :alt="produto.nome">
                </div>
                <div class="modal_dados">
                    <button v-if="produto" @click="semProduto" class="modal_fechar">X</button>
                    <span class="nodal_preco">{{numeroPreco(produto.preco)}}</span>
                    <h2 class="modal_titulo">{{produto.nome}}</h2>
                    <p>{{produto.descricao}}</p>
                    <button v-if="produto.estoque > 0" class="modal_btn" 
                        @click="adicionarItem">Adicionar Item</button>
                    <button v-else class="modal_btn esgotado" disabled>Produto Esgotado</button>
                </div>
                <div class="avaliacoes">
                    <h2 class="avaliacoes_subtitulo">Avaliações</h2>
                    <ul>
                        <li v-for="(avaliacao, index) in produto.reviews" class="avaliacao" :key="index">
                            <p class="avaliacao_descricao">{{avaliacao.descricao}}</p>
                            <p class="avaliacao_usuario">{{avaliacao.nome}} | {{avaliacao.estrelas}} estrelas</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section>
            <Alerta v-if= "$store.state.alertaAtivo" />
        </section>
    </div>
</template>

<script>
import { api } from "@/services.js";
import Alerta from "@/views/Alerta.vue";
import numeroPreco from "@/api/mixins/numeroPreco.js";

// import * as path from 'path'
//import axios from "axios"
import { mapState, mapMutations } from "vuex";
export default {
    name: "Produto",
    components: {
        Alerta
    },
    props: ["id"],
    data() {
        return {
            //produto: [],
        }
    },
    mixins: [numeroPreco],
    computed: {
        ...mapState(["produto","carrinho", "mensagemAlerta", "alertaAtivo"]),
    },
    methods: {
        ...mapMutations(["UPDATE_PRODUTO", "PUSH_CARRINHO", "DECREMENTA_ESTOQUE"]),
        getURL(imageName){
        //    return require(`@/api/produtos/${imageName}/${imageName}-foto.jpg`)
        },
        fetchProduto() {
            api.get(`/produtos/${this.id}`)
                .then(r => {
                    this.UPDATE_PRODUTO(r.data);
                })
            /*this.produto = dados
            console.log(this.produto, id)
            axios.get(`@/api/produtos/${id}/dados.json`)
                .then(r => {
                    this.produto = r.data;
                })*/
        },
        fecharModal({ target, currentTarget }) {
            if (target === currentTarget) {
                document.title = "Techno"
                this.UPDATE_PRODUTO(false)
                this.$router.push({ name: "Home" });                
            }
        },
        semProduto(){
           document.title = "Techno"
           this.UPDATE_PRODUTO(false)
           this.$router.push({ name: "Home" });
        },
        adicionarItem(){
            if (this.produto === false)
                return
            this.DECREMENTA_ESTOQUE();
            const { id, nome, preco } = this.produto;
            // console.log('produto: ', this.produto)
            this.PUSH_CARRINHO({ id, nome, preco });
            this.alerta(`${nome} adicionado ao carrinho.`);
            window.localStorage.carrinho = JSON.stringify(this.carrinho); 
        },
         alerta(mensagem) {
            this.$store.state.mensagemAlerta = mensagem;
            this.$store.state.alertaAtivo = true;
            setTimeout(() => {
                this.$store.state.alertaAtivo = false;
            }, 1500);
        },
        checarLocalStorage() {
            if (window.localStorage.carrinho){
                this.$store.state.carrinho = JSON.parse(window.localStorage.carrinho);
            }
        },
        compararEstoque() {
            const items = this.carrinho.filter(({ id }) => id === this.produto.id);
            this.$store.state.produto.estoque -= items.length;
        },
        
    },
    watch: {
        produto() {
            document.title = this.produto.nome || "Techno";
            const hash = this.produto.id || "";
            history.pushState(null, null, `${hash}`);
            if (this.produto) {
                this.compararEstoque();
            }
        },
        carrinho() {
            window.localStorage.carrinho = JSON.stringify(this.carrinho); 
        },
    },
    created() {
        this.fetchProduto();
  }
}
</script>

<style scoped>
    /* MODAL */
.modal::before{
    content: "";
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
}

.modal{
    display: flex;
    flex-direction: column;
    position: absolute;
    align-items: center;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 80px;
}

.modal_container{
    position: relative;
    background: linear-gradient(to right, transparent 250px, white 250px);
    z-index: 1;
    display: grid;
    align-items: end;
    grid-gap: 50px;
    padding: 50px 50px 50px 0;
    animation: fadeIn .3s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate3d(50px, 0, 0);
    }
    to {
        opacity: 1;
        transform: translate3d(0px, 0, 0);
    }
}

.modal_fechar {
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

.modal_img {
    grid-column: 1;
    margin-top: 50px;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, .1), 0px 4px 10px rgba(0, 0, 0, .2);
}

.modal_img img {
    max-width: 300px;
    display: block;
}

.modal_dados {
    grid-column: 2;
    max-width: 600px;
}

.modal_titulo {
    font-size: 3rem;
}

.modal_btn {
    margin-top: 80px;
    background: #000;
    cursor: pointer;
    color: #ffffff;
    border: none;
    font-size: 1rem;
    padding: 10px 25px;
    font-family: "Noto Serif";
}

.modal_btn.esgotado {
    background: #808080;
}

.modal_btn:active {
    background: #808080;
}

/* AVALIACOES */
.avaliacoes {
    grid-column: 2;
}

.avaliacao {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    padding-bottom: 20px;
}

.avaliacoes_subtitulo {
    font-size: 1.75rem;
}

.avaliacao_descricao {
    color: rgba(0, 0, 0, .7);
    margin: 10px 0 5px 0;
}

.avaliacao_usuario {
    font-weight: bold;
}

/* RESPONSIVO */

@media screen and (max-width: 900px) {
    .modal {
        padding: 10px;
    }
    .modal_container {
        grid-gap: 20px;
        background: #ffffff ;
        padding: 10px 0;
    }
    .modal_img {
        grid-row: 2;
    }
    .modal_img img {
        width: 100%;
        max-width: initial;
    }
    .modal_dados {
        grid-column: 1;
        padding: 10px;
    }
    .modal_btn {
        margin-top: 20px;
    }
    .avaliacoes {
        grid-column: 1;
        padding: 10px;
    }
}
</style>