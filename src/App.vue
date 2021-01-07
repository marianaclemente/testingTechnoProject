
<template>
  <div>
    <body> 
      <div id="app">
        <TheHeader/>
        <router-view/>
        <ProdutosLista/>
      </div>
    </body>
  </div>
  
</template>

<script>
import TheHeader from "@/components/TheHeader.vue"
import ProdutosLista from "@/components/ProdutosLista.vue"
import { mapState } from "vuex";


export default {
  created(){
    this.checarLocalStorage();
    //window.localStorage.carrinho = JSON.stringify(this.$store.state.carrinho); 
  },
  methods: {
    checarLocalStorage() {
            if (window.localStorage.carrinho){
                this.$store.state.carrinho = JSON.parse(window.localStorage.carrinho);
            }
        }
  },
  computed: {
    ...mapState(["produto", "carrinho", "totalCarrinho", "carrinhoAtivo"]),
  },
  components: {
    TheHeader,
    ProdutosLista,

  }
}
</script>

<style>
body,
h1,
h2,
ul,
li,
p {
  padding: 0px;
  margin: 0px;
}

ul {
  list-style: none;
}

* {
  box-sizing: border-box;
}

body {
  background: linear-gradient(to right, #1a1a1a 30%, #ffffff 30%);
  font-family: "Noto Serif";
}

#app {
  padding: 0 80px;
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

/* RESPONSIVO */

@media screen and (max-width: 900px) {
    #app {
        padding: 0 10px;
    }
}
</style>
