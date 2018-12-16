<template>
    <div class="avisos">
    <div> Produtos Faltantes</div>
    <li v-for="produto in faltantes" :key="produto">
    {{ produto}}
  </li>
  <div> Produtos Vencidos</div>
    <li v-for="produto in vencidos" :key="produto">
    {{ produto}}
  </li>
    


    </div>
</template>

<script>
import { baseApiUrl, showError, axios} from '@/global'

export default {
    nome:'Avisos',
    data: function() {
        return {
            mode: 'save',
            produto: {},
            produtos: [],
            vencidos: [],
            faltantes: [],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true},
                { key: 'tipo', label: 'Categoria', sortable: true},
                { key: 'preco', label: 'Preço', sortable: true},
                { key: 'descricao', label: 'Descrição', sortable: true},
                { key: 'actions', label: 'Ações'}
            ]
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
            });
            
        },
         avisaFalta() {
             console.log(this.produtos.length)
             
             this.produtos.forEach(produto => {
                console.log("entrou aki")
                console.log(produto)
                if(quantidadeDisponivel <= 15) {
                    
                    this.faltantes.push(nome)
                }
                if(vencimentoProximo) {
                    this.vencidos.push(nome)
                }

            }) 
           
        }
    },
    mounted() {
        this.loadItens()
        this.avisaFalta()
    } 

}
</script>

<style>

</style>
