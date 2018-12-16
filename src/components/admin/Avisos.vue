<template>
    <div class="avisos">
    <b-table striped hover :items="faltantes" :fields="fields"></b-table>  
    <b-table striped hover :items="vencidos" :fields="fields2"></b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError, axios} from '@/global'

export default {
    nome:'Avisos',
    data: function() {
        return {
            produtos: [],
            vencidos: [],
            faltantes: [],
            fields: [{ key: 'nome', label: 'Produtos Faltantes', sortable: true}],
            fields2: [{ key: 'nome', label: 'Produtos com lotes vencidos ou próximos do vencimento', sortable: true}]
        }
    },
    methods: {
        loadItens() {

            this.produtos = [];
            axios.get("https://farmacia-cg.herokuapp.com/public/produtos").then(res => {
                res.data.forEach((data) => {
                    data.produto.quantidadeDisponivel = data.quantidadeDisponivel;
                    this.produtos.push(data.produto);
                })
            }).then(() =>{
                this.avisaFalta()
                })
        },

         avisaFalta() {
             
             this.produtos.forEach(produto => {
                if(produto.quantidadeDisponivel <= 15) {
                    this.faltantes.push(produto)
                }
                if(produto.vencimentoProximo) {
                    this.vencidos.push(produto)
                }

            }) 
           
        }
    },
    mounted() {
        this.loadItens()
    }

}
</script>

<style>

</style>
