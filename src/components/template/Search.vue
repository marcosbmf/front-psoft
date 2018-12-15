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
                <th>Situação</th>
                <th>Preço</th>
                <th>Tipo</th>
            </thead>
            <tbody>
                <tr class="cursor" @click="addTableRow(result)" v-for="result in queryResults" :key="result.nome">
                    <td>{{result.nome}}</td>
                    <td>{{result.situacao}}</td>
                    <td>{{result.preco}}</td>
                    <td>{{result.tipo}}</td>
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

export default {
    name: 'Search',
    data: function() {
        return {
            query: '',
            options: Prods,
            aparece: false
        }
    },
    methods: {
        addTableRow(elem) {
            const table = document.getElementById('lista');
            const newRow = table.insertRow(-1);
            const but = table.insertRow(-1);
            const newCell = newRow.insertCell(0);
            const newCell2 = but.insertCell(0);
            let newText = document.createTextNode(elem.nome);
            newCell.appendChild(newText);
            newCell2.appendChild(newText);
            this.aparece = true;
        },
        compra() {
            $div = document.getElementById('compra');
            return new Promise(function(r) {
                $div.innerText = "Comprando...";
            })
            .then(
                setTimeout(function() {
                    $div.innerText = "Feito!"
                }, 1000)
            )
            .then(
                $div.innerText = ""
            );
        }
    },
    computed: {
        queryResults() {
            if(!this.query) return this.options;
            const preparedQuery = fz.prepareQuery(this.query);
            const scores = {};

            return this.options
                .map((option, index) => {
                    const scorableFields = [
                        option.nome,
                        option.situacao,
                        option.tem,
                        `${option.tipo}`
                    ].map(toScore => fz.score(toScore, this.query, { preparedQuery }));
                    scores[option.nome] = Math.max(...scorableFields);
                    return option;
                })
                .filter(option => scores[option.nome] > 1)
                .sort((a, b) => scores[b.nome] - scores[a.nome]);
        }
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
