<template>
    <div class="vendas-admin">
         <b-form>
            <input id="venda-nome" type="hidden" v-model="venda.nome"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Id:" label-for="venda-id" v-if="mode === 'save'">
                        <b-form-input id="venda-id" type="text" v-model="venda.numeroPedido" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Id do venda..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Situação:" label-for="venda-situacao" v-if="mode === 'save'">
                        <select id= "situacao" type="Dropdown Button" v-model="venda.situacao" required :readonly="mode === 'remove'">
                            <option v-for="option in situacoes" :key="option.text">{{option.text}}</option>
                        </select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2" ref="detalhes">
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'none'" @click="adicionaPedido">Realizar Venda</b-button>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button class="ml-2" v-if="mode === 'save'" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="vendas" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadVenda(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showErro, axios} from '@/global'

export default {
    nome:'VendasAdmin',
    data: function() {
        return {
            mode: 'none',
            venda: {},
            vendas: [],
            situacoes: [{text: "Entregue", id:1}, {text: "Não entregue", id:2}],
            detalhes: "",
            fields: [
                { key: 'numeroPedido', label: 'Id', sortable: true},
                { key: 'situacao', label: 'Situacao', sortable: true},
                { key: 'dataEmissao', label: 'Data de Emissão', sortable: true},
                { key: 'precoTotal', label: 'Valor Total', sortable: true},
                { key: 'actions', label: 'Ações'}

            ]
        }
    },
    methods: {
        loadVendas() {
            
            this.vendas = []
            this.$refs.detalhes.innerHTML = "";

            axios.get("https://farmacia-cg.herokuapp.com/protected/pedidos").then(res => {
                res.data.forEach((data) => {
                    this.vendas.push(data);
                })
            })
        },

        adicionaPedido(){
            this.$router.push({ path: '/'});
        },

        reset() {
            
            this.mode = 'none'
            this.venda = {}
            this.loadVendas()
        },

        save() {
            axios({
                    method: "put",
                    url: "https://farmacia-cg.herokuapp.com/protected/pedidos/" + this.venda.numeroPedido,
                    data: this.venda
                 })
                 .then(() => alert("Alteração realizada com sucesso!"))
                 .catch(() => alert("Aconteceu algum erro na requisição :("))
            this.reset();
        },

        remove() {
            this.reset();
        },

        loadVenda(venda, mode = 'save') {
            this.mode = mode
            this.venda = { ...venda }
            this.printOrder(venda);
        },

        printOrder(venda){
            let order  = "Detalhes do pedido: \n\n";

            venda.itens.forEach((item) => {
                order += `${item.itemPK.produto.nome} - quantidade: ${item.quantidade} - preço: R$${item.precoTotal}\n`
            })

            order += `\nCadastrado por: ${venda.usuario.username}\nPreço total: R$${venda.precoTotal}`

            this.$refs.detalhes.innerText = order + "\n\n";
        }

       

    },
    mounted() {
        this.loadVendas()
    }
}
</script>

<style>

</style>
