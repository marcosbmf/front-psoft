<template>
    <div class="lotes-admin">
        <b-form>
            <input id="lote-nome" type="hidden" v-model="lote.numeroLote"/>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Número:" label-for="lote-numero">
                        <b-form-input id="lote-numero" type="text" v-model="lote.numeroLote" required :readonly="true" 
                        placeholder="Informe o numero do lote..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="2">
                    <b-form-group label="Validade:" label-for="lote-validade">
                        <b-form-input id="lote-validade" type="text" v-model="lote.dataValidade" required :readonly="mode === 'remove'" 
                        placeholder="2001-09-08" />
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
                    <b-form-group label="Código do produto:" label-for="lote-codBarra">
                        <b-form-input id="lote-codBarra" type="text" v-model="lote.produto.codBarra" required :readonly="mode === 'remove'" 
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
import { baseApiUrl, showError, axios} from '@/global'

export default {
    nome:'LotesAdmin',
    data: function() {
        return {
            mode: 'save',
            lote: {
                produto: {}
            },
            lotes: [],
            fields: [
                { key: 'numeroLote', label: 'Número', sortable: true},
                { key: 'dataValidade', label: 'Validade', sortable: true},
                { key: 'quantidadeInicial', label: 'Quantidade Inicial', sortable: true},
                { key: 'quantidadeVendida', label: 'Quantidade Vendida', sortable: true},
                { key: 'produto.nome', label: 'Produto referido', sortable: true},
                { key: 'produto.codBarra', label: 'Código de Barras', sortable: true},
                { key: 'actions', label: 'Ações'}
            ]
        }
    },
    methods: {
        loadLotes() {
            this.lotes = [];
            axios.get("https://farmacia-cg.herokuapp.com/admin/produtos/-1/lotes").then(res => {
                res.data.forEach((data) => {
                    this.lotes.push(data);
                })
            });
        },

        reset() {
            
            this.mode = 'save'
            this.lote = {
                produto: {}
            }
            this.loadLotes()
        },

        save() {
            axios.get(`https://farmacia-cg.herokuapp.com/public/produtos/` + this.lote.produto.codBarra).then(res => {
                this.lote.produto = res.data.produto;
            }).then(() => {
                axios({
                        method: "post",
                        url: `https://farmacia-cg.herokuapp.com/admin/produtos/${this.lote.produto.codBarra}/lotes`,
                        data: this.lote
                    }).then(() => {
                        this.$toasted.global.defaultSuccess({msg: "Cadastro de lote realizado com sucesso"})
                        this.reset();
                        })
            });
        },

        remove() {
            axios({
                method: 'DELETE',
                url: `https://farmacia-cg.herokuapp.com/admin/produtos/${this.lote.produto.codBarra}/lotes/${this.lote.numeroLote}`
            }).then(() => {
                         this.$toasted.global.defaultSuccess({msg: "Remoção Realizada"})
                         this.reset();
                 });
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
