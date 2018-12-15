<template>
    <div class="lotes-admin">
        <b-form>
            <input id="lote-nome" type="hidden" v-model="lote.numero"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Número:" label-for="lote-numero">
                        <b-form-input id="lote-numero" type="text" v-model="lote.numero" required :readonly="mode === 'remove'" 
                        placeholder="Informe o numero do lote..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Validade:" label-for="lote-validade">
                        <b-form-input id="lote-validade" type="text" v-model="lote.dataValidade" required :readonly="mode === 'remove'" 
                        placeholder="Informe a Validade do lote..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Quantidade Inicial:" label-for="lote-qinicial">
                        <b-form-input id="lote-qinicial" type="text" v-model="lote.quantidadeInicial" required :readonly="mode === 'remove'" 
                        placeholder="Informe a quantidade inicial do lote..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Código do produto:" label-for="lote-codbarra">
                        <b-form-input id="lote-codbarra" type="text" v-model="lote.codBarra" required :readonly="mode === 'remove'" 
                        placeholder="Informe o Código do produto..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="lotes" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadLote(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadLote(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
const axios = require("axios");

export default {
    nome:'LotesAdmin',
    data: function() {
        return {
            mode: 'save',
            lote: {},
            lotes: [{numero: "1", validade: "01/02/2019", qinicial: 5, qvendida: 0, codbarra: "111"},
                    {numero: "2", validade: "01/02/2019", qinicial: 7, qvendida: 0, codbarra: "110"},
                    {numero: "3", validade: "01/02/2019", qinicial: 9, qvendida: 0, codbarra: "111"}],
            fields: [
                { key: 'numero', label: 'Número', sortable: true},
                { key: 'validade', label: 'Validade', sortable: true},
                { key: 'qinicial', label: 'Quantidade Inicial', sortable: true},
                { key: 'qvendida', label: 'Quantidade Vendida', sortable: true},
                { key: 'codbarra', label: 'Produto referido', sortable: true},
                { key: 'actions', label: 'Ações'}

            ]
        }
    },
    methods: {
        loadLotes() {
            
            return this.lotes;

        },

        reset() {
            
            this.mode = 'save'
            this.lote = {}
            this.loadLotes()
        },

        save() {
            axios.get(`https://farmacia-cg.herokuapp.com/produtos/` + this.lote.codBarra).then(res => {
                this.lote.produto = res.data.produto;
            }).then(() => {
                axios({
                        method: "put",
                        url: `https://farmacia-cg.herokuapp.com/produtos/${this.lote.codBarra}/lote`,
                        data: this.lote
                    }).then(() => {
                        alert("Cadastro de lote realizado com sucesso")
                        this.reset();
                        })
            });
        },

        remove() {
            this.lotes.forEach(element => { 
                if(element.numero == this.lote.numero){
                    this.lotes.splice(this.lotes.indexOf(element), 1);
                }
             });
            this.reset();

        },
        loadLote(lote, mode = 'save') {
            this.mode = mode
            this.lote = { ...lote }
        }

    },
    mounted() {
        this.loadLotes()
    }
}
</script>

<style>

</style>
