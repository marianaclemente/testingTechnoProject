<template>
    <div>
        <section>
            <Carrinho v-if= "$store.state.carrinhoAtivo" />
            <!-- <ProdutosLista/> -->
        </section> 
    </div>
</template>

<script>
// import ProdutosLista from "@/components/ProdutosLista.vue"
import Carrinho from "@/views/Carrinho.vue";

export default {
    name: "Home",
    components: {
        // ProdutosLista,
        Carrinho,
    }
};
</script>