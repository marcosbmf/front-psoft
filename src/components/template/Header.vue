<template>
    <header class="header">
        <div>
            <b-btn v-if="hideItens" v-b-modal.modal1 id="modal1">Produtos disponíveis</b-btn>
                <b-modal id="modal1">
                    <h1 class="title1">Produtos disponíveis para compra</h1>
                    <b-table hover striped :items="produtos" :fields="fields"></b-table>
                    <h1 class="title1">Produtos em falta</h1>
                    <b-table hover striped :items="faltantes" :fields="fields"></b-table>
                </b-modal>

        </div>
        <h1 class="title">
            <router-link to="/">{{ title }}</router-link>
        </h1>
        <UserDropdown v-if="!hideUserDropdown" />

    </header>
</template>

<script>
import UserDropdown from './UserDropdown'
import { baseApiUrl, showError, axios} from '@/global'

export default {
    name: 'Header',
    components: { UserDropdown },
    data: function() {
        return {
            produtos: [],
            faltantes: [],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true},
                { key: 'precoPromocional', label: 'Preço', sortable: true},


            ]
        }
    },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean,
        hideItens: Boolean
    },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? "fa-angle-left" : "fa-angle-down"
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        },
        showModal() {
            this.produtos = [];
            axios.get("https://farmacia-cg.herokuapp.com/public/produtos").then(res => {
                res.data.forEach((data) => {
                    data.produto.precoPromocional = data.precoPromocional
                    if(data.quantidadeDisponivel > 0) {
                    this.produtos.push(data.produto)
                    }
                    else {
                        data.produto.precoPromocional = "Em falta!"
                        this.faltantes.push(data.produto)
                    }
                })
            })
        }
    },
    mounted() {
        this.showModal()
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }
    .title a {
        color: #FFF;
        text-decoration: none;
    }

      .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0,0,0, 0.2);
    }

    #modal1 {

        background: linear-gradient(to right, #1e469a, #49a7c1);
        width: -webkit-fill-available;
    }

    .title1{
        font-size: 1.5rem;
    }



</style>
