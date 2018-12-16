<template>
    <div class="promocoes-admin">
        <b-form>
            <input id="promocao-nome" type="hidden" v-model="promocao.categoria"/>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Data início:" label-for="promocao-di">
                        <b-form-input id="promocao-di" type="text" v-model="promocao.dataInicio" required :readonly="mode === 'remove'" 
                        placeholder="Informe a data inicial da promocao..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Data Final:" label-for="promocao-df">
                        <b-form-input id="promocao-df" type="text" v-model="promocao.dataTermino" required :readonly="mode === 'remove'" 
                        placeholder="Informe a data final da promocao..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Tipo de desconto" label-for="promocao-tipos">
                        <select id="promocao-tipos" type="Dropdown Button" v-model="promocao.tipoDesconto" required :readonly="mode === 'remove'">
                            <option v-for="option in tiposDesconto" :key="option.text">{{option.text}}</option>
                        </select>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Categoria:" label-for="produto-categoria">
                        <select id="tipos-produto" type="Dropdown Button" v-model="promocao.tipoProduto" required :readonly="mode === 'remove'">
                            <option v-for="option in tiposProduto" :key="option.text">{{option.text}}</option>
                        </select>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="promocoes" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadPromocao(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadPromocao(data.item, 'remove')">
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
    nome:'PromocoesAdmin',
    
    data: function() {
        return {
            mode: 'save',
            tipo: "Sem desconto",
            tiposDesconto:[{text: "Bom desconto", id:1}, {text: "Ótimo desconto", id:2}, {text: "Super desconto", id:3}],
            tiposProduto: [{text: "medicamento", id:1}, {text: "alimento", id:2}, {text: "higiene pessoal", id:3}, {text: "cosmético", id:4}],
            promocao: {},
            promocoes: [],
            fields: [
                { key: 'tipoDesconto', label: 'Categoria', sortable: true},
                { key: 'dataInicio', label: 'Data Inicial', sortable: true},
                { key: 'dataTermino', label: 'Data Final', sortable: true},
                { key: 'tipoProduto', label: 'Tipo de desconto', sortable: true},
                { key: 'ocorrendo', label: 'Ativa', sortable: true},
                { key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadPromocoes() {
            this.promocoes = [];
            axios.get("https://farmacia-cg.herokuapp.com/admin/promocoes").then(res => {
                res.data.forEach((data) => {
                    this.promocoes.push(data);
                })
            });

        },

        reset() {
            this.mode = 'save'
            this.promocao = {}
            this.loadPromocoes()
        },

        save() {
            axios({
                    method: "post",
                    url: "https://farmacia-cg.herokuapp.com/admin/promocoes",
                    data: this.promocao
                 }).then(() => {
                     this.$toasted.global.defaultSuccess({msg: "Promoção cadastrada com sucesso!"})
                     this.reset();
                 }).catch(() => {
                     this.$toasted.global.defaultSuccess({msg: "Ocorreu algum erro no cadastro!"})
                     this.reset();
                 });
        },

        remove() {
            this.$toasted.global.defaultSuccess({msg: "Impossível remover promoções por hora!"});
        },
        
        loadPromocao(promocao, mode = 'save') {
            this.mode = mode
            this.promocao = { ...promocao }
        }

    },
    mounted() {
        this.loadPromocoes()
    }
}
</script>

<style>

</style>
