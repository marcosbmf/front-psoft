<template>
    <div class="itens">
        <b-table class="cursor" thead-class="{'active': produto.active}" striped 
            @row-clicked="setActive" :items="produtos" :fields="fields">
        </b-table>
        <b-button @click="buy">Comprar</b-button>
    </div>
</template>

<script>
export default {
    name: 'Itens',
    data: function() {
        return {
            mode: 'save',
            produto: {},
            produtos: [{nome: "pasta", situacao: "tem",  preco: "5,30", quantidade: 5, active: false},
                    {nome: "dorflex",  situacao: "tem",  preco: "66,30", quantidade: 8, active: false},
                    {nome: "cheetos", situacao: "tem", preco: "0,30", quantidade: 6, active: false}],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true},
                { key: 'situacao', label: 'Situação', sortable: true},
                { key: 'preco', label: 'Preço', sortable: true},
                // { key: 'actions', label: 'Ações'},
                { key: 'quantidade', label: 'Quantidade'}

            ]
        }
    },
    methods: {
        setActive: function(prod) {
            prod.active = !prod.active;
            prod.style.color = "blue"
        },
        testa: function() {
            return this.produtos.every(elem => elem.quantidade > 0);
        },
        buy : function() {
            if(this.testa) {
                this.produtos.forEach(function(elem) {
                    if(elem.active) {
                        elem.quantidade -= 1;
                    }
                });
            }
        }
    }
}
</script>

<style>
    .cursor {
        cursor: pointer;
    }

    .active {
        color: blueviolet;
    }

</style>
