<template>
    <div id="search">
        <label class="tabela">
            <label class="control-label">Search</label>
            <input class="form-control" placeholder="Digite seu medicamento aqui..." 
            v-model="query"/>
        </label>
        <table class="tabela fundo table table-striped table-bordered table-condensed table-hover"
         style="width: 100%" border="1px" cellpadding="5px" cellspacing="0">
            <thead>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Tipo</th>
            </thead>
            <tbody>
                <tr class="cursor" @click="addTableRow(result)" v-for="result in queryResults" :key="result.nome">
                    <td>{{result.produto.nome}}</td>
                    <td>{{result.quantidadeDisponivel}}</td>
                    <td>{{result.precoPromocional}}</td>
                    <td>{{result.produto.tipo}}</td>
                </tr>
            </tbody>
        </table>
        <div id="compra">
            <table id="lista">
                <thead>
                    <th>Sua lista aqui...</th>
                </thead>
                <tbody id="lista">
                    <tr>

                    </tr>
                </tbody>
            </table>
            <button @click="compra" v-if="aparece">Comprar</button>
        </div>		
    </div>
</template>

<script>
import fz from 'fuzzaldrin-plus';
import Prods from './prod.json';
const axios = require("axios");
export default {
    name: 'Search',
    data: function() {
        return {
            query: '',
            options: Prods,
            aparece: false,
            produtos: [],
            produtosCompra: []
        }
    },
    methods: {
        addTableRow(elem) {
            if(elem.quantidadeDisponivel > 0) {
                const table = document.getElementById('lista');
                const newRow = table.insertRow(-1);
                const but = table.insertRow(-1);
                const newCell = newRow.insertCell(0);
                const newCell2 = but.insertCell(0);
                let newText = document.createTextNode(elem.produto.nome);
                newCell.appendChild(newText);
                newCell2.appendChild(newText);
                this.aparece = true;
                this.produtosCompra.push(elem);
            }
            else {
                alert("Elemento em falta... /:");
            }
        },
        diminui(prod) {
            axios({
                method: 'PUT'
            })
            // axios({
            //     method: 'DELETE',
            //     url: "https://farmacia-cg.herokuapp.com/public/produtos/" + prod.produto.codBarra
            // }).then(() => {
            //              alert("Remoção realizada!")
            //              this.reset();
            //      })
            // .catch(
            //     alert("Erro ao deletar produto!")
            // );
            // prod.quantidadeDisponivel -= 1;
            // alert(prod.quantidadeDisponivel);
        },
        compra() {
            this.produtosCompra.forEach(elem => 
                elem.quantidadeDisponivel -= 1);
            this.produtosCompra = [];
        },
        loadItens() {
            this.produtos = [];
            axios.get("https://farmacia-cg.herokuapp.com/public/produtos").then(res => {
                res.data.forEach((data) => {
                    if(data.quantidadeDisponivel == 0){
                        data.precoPromocional = "Indisponível";
                    }
                    this.produtos.push(data);
                })
            });
        },
    },
    computed: {
        queryResults() {
            if(!this.query) return this.produtos
            const preparedQuery = fz.prepareQuery(this.query);
            const scores = {};
            return this.produtos
                .map((option, index) => {
                    const scorableFields = [
                        option.produto.nome,
                        option.quantidadeDisponivel,
                        option.produto.preco,
                        `${option.produto.tipo}`
                    ].map(toScore => fz.score(toScore, this.query, { preparedQuery }));
                    scores[option.produto.nome] = Math.max(...scorableFields);
                    return option;
                })
                .filter(option => scores[option.produto.nome] > 1)
                .sort((a, b) => scores[b.produto.nome] - scores[a.produto.nome]);
        }
    },
    mounted() {
    }, 
    created() {
        this.loadItens();
    }
}
</script>

<style>
    #search {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .tabela {
        grid-column-start: 1;
        grid-column-end: 2;
        padding-left: 20px;
    }
    .fundo {
        background: lightblue;
        margin: 20px;
    }
    label {
        padding-top: 10px;
    }
    #lista {
        padding-top: 10px;
        grid-column-start: 2;
        grid-column-end: 3;
        margin-left: 40px;
    }
    button {
        grid-row-start: 4;
        grid-row-end: 5;
        grid-column-start: 2;
        grid-column-end: 3;
        width: 20%;
        margin-left: 40px;
    }
    .cursor {
        cursor: pointer;
    }
    input {
        width: 20%;
    }
</style>
