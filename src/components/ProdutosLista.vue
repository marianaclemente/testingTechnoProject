<template>
    <section class="produtos">
        <div v-for="item in produtos" @click="abrirModal(item.id)" :key="item.id" >
            <router-link :to="{name: 'Produto', params: {id: item.id}}" custom v-slot="{ navigate }">
            <div role="link" @click="navigate" class="produto">
                <img :src="getURL(item.id)" :alt="item.nome" class="produto_img"/>
                <div class="produto_info">
                    <span class="produto_preco">{{numeroPreco(item.preco)}}</span>
                    <h2 class="produto_titulo">{{item.nome}}</h2>
                </div>
            </div>
            </router-link>
        </div>
    </section>
</template>

<script>
import { api } from "@/services.js";
import numeroPreco from "@/api/mixins/numeroPreco.js";
import { mapMutations } from "vuex";

// import image from "@/api/produtos/notebook/notebook.jpg"
export default {
    // name: "ProdutosLista",
    data() {
        return {
            produtos: [],
            //baseURL: "http://localhost:3000/",   
        }
    },
    mixins: [numeroPreco],
    computed: {

    },
    methods: {
        ...mapMutations(["UPDATE_PRODUTO"]),
        getURL(imageName){
            return require(`@/api/produtos/${imageName}/${imageName}.jpg`)
        },
        async fetchProduto(id) {
            await api.get(`/produtos/${id}`)
                .then(r => {
                    this.UPDATE_PRODUTO(r.data);
                })
                .catch(function (error) {
                    console.log('request failed', error)
                })
        },
        async fetchProdutos() {
            //this.produtos = dados
            await api.get("/produtos")
                .then(r => {
                    this.produtos = r.data;
                })
        },
        abrirModal(id) {
            this.fetchProduto(id);
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        router() {
            const hash = document.location.hash;
            if (hash) {
                this.fetchProduto(hash.replace("#", ""));
            }
        }
    },
    watch: {
        url() {
            this.fetchProdutos();
        }
    },
    created() {
        this.fetchProdutos();
    // api.get(`/produtos/${this.image}`)
    //     .then(r => {
    //        this.image = r.data.img
    //     })
    
  }
}
</script>

<style scoped>
/* LISTA PRODUTOS */

.produtos {
    max-width: 900px;
    margin: 100px auto 0 auto;
}
.produto{
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    background: #ffffff;
    box-shadow: 0 0 2rem rgba(0, 0, 0, .1);
    cursor: pointer;
}

.produto_img{
    max-width: 300px;
    margin-right: 40 px;
}

.produto_titulo {
    font-size: 3rem;
    line-height: 1;
}

.produto_preco {
    color: rgba(0, 0, 0, .5);
}

/* RESPONSIVO */

@media screen and (max-width: 900px) {
    .produtos {
        margin-top: 40px;
    }
    .produto {
        flex-direction: column;
        align-items: flex-start;
        max-width: 300px;
        margin: 30px auto;
    }
    .produto_info {
        padding: 20px;
    }
    .produto_img {
        max-width: 100%;
    }
    .produto_titulo {
        font-size: 1.5rem;
    }
}
</style>