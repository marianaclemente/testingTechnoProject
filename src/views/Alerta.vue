<template>
    <div>
        <div class="alerta" :class="{ativo: $store.state.alertaAtivo}">
            <p  class="alerta_mensagem">{{$store.state.mensagemAlerta}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
       return{
            
       }  
    }, 
    methods: {
        
    }
}
</script>

<style scoped>
/* ALERTA */

.alerta {
    position: absolute;
    top: 20px;
    left: 0px;
    z-index: 30;
    width: 100%;
    text-align: center;
    display: none;
}

.alerta.ativo {
    display: block;
    animation: fadeInDown .10s forwards;
}

@keyframes fadeInDown {
    from {
        transform: translate3d(0, -30px, 0);
        opacity: 0;
    }
    to {
        opacity: 1;
        transform: translate3d(0, 0px, 0);
    }
}

.alerta_mensagem{
    background: #ffffff;
    display: inline-block;
    padding: 20px 40px;
    border: 2px solid black;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, .1), 0px, 4px, 10px rgba(0, 0, 0, .2);
}
</style>