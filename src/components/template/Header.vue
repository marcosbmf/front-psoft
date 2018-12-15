<template>
    <header class="header">
        
        <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
            <i class="fa fa-lg" :class="icon"></i>
        </a>
        <div>
            <b-btn v-b-modal.modal1 id="modal1">Ítens disponíveis</b-btn>
                <b-modal id="modal1" title="Ítens disponíveis para compra">
                    <b-table hover striped :items="produtos" :fields="fields"></b-table>
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

export default {
    name: 'Header',
    components: { UserDropdown },
    data: function() {
        return {
            mode: 'save',
            produto: {},
            produtos: [{nome: "pasta", situacao: "tem",  preco: "5,30"},
                    {nome: "dorflex",  situacao: "tem",  preco: "66,30"},
                    {nome: "cheetos", situacao: "tem", preco: "0,30"}],
            fields: [
                { key: 'nome', label: 'Nome', sortable: true},
                { key: 'situacao', label: 'Situação', sortable: true},
                { key: 'preco', label: 'Preço', sortable: true},
                { key: 'actions', label: 'Ações'}

            ]
        }
    },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
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

        }
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
    }



</style>
