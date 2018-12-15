<template>
    <div class="vendas-admin">
         <b-form>
            <input id="venda-nome" type="hidden" v-model="venda.nome"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Id:" label-for="venda-id">
                        <b-form-input id="venda-id" type="text" v-model="venda.nome" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Id do venda..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Produtos:" label-for="venda-produtos">
                        <b-form-input id="venda-produtos" type="text" v-model="venda.categoria" required :readonly="mode === 'remove'" 
                        placeholder="Informe os Produtos da venda..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Valor Total:" label-for="venda-valorTotal">
                        <b-form-input id="venda-valorTotal" type="text" v-model="venda.preco" required :readonly="mode === 'remove'" 
                        placeholder="Valor total sera calculado..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="vendas" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadVenda(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadVenda(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'

export default {
    nome:'VendasAdmin',
    data: function() {
        return {
            mode: 'save',
            venda: {},
            vendas: [{id: "1", produtos: [{codigo: "111", quantidade: 5},{codigo: "110", quantidade: 10}], valorTotal: "5,30"},
                    {id: "2", produtos: [{codigo: "111", quantidade: 5},{codigo: "110", quantidade: 10}], valorTotal: "5,30"},
                    {id: "3", produtos: [{codigo: "111", quantidade: 5},{codigo: "110", quantidade: 10}], valorTotal: "5,30"}],
            fields: [
                { key: 'id', label: 'Id', sortable: true},
                { key: 'produtos', label: 'Produtos', sortable: true},
                { key: 'valorTotal', label: 'valorTotal', sortable: true},
                { key: 'actions', label: 'Ações'}

            ]
        }
    },
    methods: {
        loadVendas() {
            
            return this.vendas;

        },

        reset() {
            
            this.mode = 'save'
            this.venda = {}
            this.loadVendas()
        },

        save() {
            var existe = false;
            Array.prototype.insert = function ( index, item ) {
                this.splice( index, 0, item );
            };

            var a = Number;
            this.vendas.forEach(element => { 
                if(element.id == this.venda.id){
                    existe = true;
                    a = this.vendas.indexOf(element);
                    this.vendas.splice(a, 1);
                }
            });
            if(!existe) {
                this.vendas.push(this.venda);
            } else {
               this.vendas.insert(a, this.venda)
            }
        
            this.reset();
        },

        remove() {
            this.vendas.forEach(element => { 
                if(element.codigo == this.venda.codigo){
                    this.vendas.splice(this.vendas.indexOf(element), 1);
                }
             });
            this.reset();

        },
        loadVenda(venda, mode = 'save') {
            this.mode = mode
            this.venda = { ...venda }
        }

    },
    mounted() {
        this.loadVendas()
    }
}
</script>

<style>

</style>
