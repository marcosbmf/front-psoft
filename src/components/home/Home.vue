<template>
    <div class="home">
        <!-- <PageTitle icon="fa fa-home" main="Dashboard"
            sub="CCC Pharma" />
        <div class="stats">
            <Stat title="Adicionar item" 
                icon="fa fa-plus" color="#d54d50" />
            <Stat title="Relatório de Ítens" 
                icon="fa fa-file" color="#3bc480" />
            <Stat title="Gerenciar Lotes" 
                icon="fa fa-folder" color="#3282cd" />
            <Stat title="Gerenciar Vendas" 
                icon="fa fa-sellsy" color="aqua" />
        </div> -->

        <Itens></Itens>

        <Search />

    </div>
</template>

<script>

import Itens from '../template/Itens'

import Search from '../template/Search'

import PageTitle from '../template/PageTitle'
import Stat from './Stat'
import axios from 'axios'
import { baseApiUrl } from '@/global'


export default {
    name: 'Home',

    components: { PageTitle, Stat, Search, Itens},
    
}
</script>

<style>
 .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

</style>
