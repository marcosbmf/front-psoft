<template>
    <div class="pedidos">
        <h1 class="tp">Seus Pedidos s2</h1>
            <h2 class="tp2" v-if="user === ''">
                Você não está logado...
            </h2>
            <ul class="tiraAdmin" v-else>
                <li v-for="pedido in pedidos" :key="pedido.id">
                    <span v-if="pedido.situacao === 'Não entregue'" >
                        O pedido #{{pedido.numeroPedido}} ainda não foi entregue.
                    </span>
                    <span v-else>
                        Pedido #{{pedido.numeroPedido}} entregue.
                    </span>
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
            pedidos: [],
            user: ''
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
        },
        loadUsuario() {
            axios.get("https://farmacia-cg.herokuapp.com/protected/conta")
                .then(r => {
                    this.user = r.data;
                });
        }
    },
    mounted() {
        this.loadPedidos()
        this.loadUsuario()
    }

}
</script>

<style>
    [v-cloak] {
        display: none;
    }

    h1.tp {
        margin: 20px;
        font-size:50px;
        font-weight: normal;
        line-height:1;
        text-shadow:0 3px 0 rgba(0,0,0,0.1);
    }

    ul.tiraAdmin { 
        list-style:none;
        color:#fff;
        font-size:20px;
        text-align: left;
        margin:20px 0 15px;
    }

    ul.tiraAdmin li{
        padding:20px 30px;
        background: linear-gradient(to right, #1e469a, #49a7c1);
        margin-bottom:8px;
        box-shadow:0 1px 1px rgba(0,0,0,0.1);
        width: 600px;
    }

    h2 {
        margin: 25px;
        font-size: 25px;
    }

</style>
