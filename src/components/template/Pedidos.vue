<template>
    <div class="pedidos">
        <h1>Seus Pedidos s2</h1>
        <ul>
            <li v-for="pedido in pedidos" :key="pedido.id">
                O pedido {{pedido.numeroPedido}} do usuário {{pedido.usuario.username}}
                está {{pedido.situacao}}
            </li>
        </ul>
    </div>
</template>

<script>
const axios = require("axios");

export default {
    name: 'Pedidos',
    data: function() {
        return {
            pedidos: []
        }
    },
    methods: {
        loadPedidos() {
            axios.get("https://farmacia-cg.herokuapp.com/protected/pedido")
                .then(r => {
                    r.data.forEach(data => {
                        this.pedidos.push(data);
                    })
                });
        }
    },
    mounted() {
        this.loadPedidos()
    }

}
</script>

<style>

</style>
