<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
            sub="Cadastros & Cia" />
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Avisos" active>
                        <Avisos/>
                    </b-tab>
                    <b-tab title="Itens">
                        <ItensAdmin/>
                    </b-tab>
                    <b-tab title="Lotes">
                        <LotesAdmin/>
                    </b-tab>
                    <b-tab title="Vendas">
                        <VendasAdmin/>
                    </b-tab>
                    <b-tab title="Promoçoes">
                        <promocoesAdmin/>
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import ItensAdmin from './ItensAdmin'
import LotesAdmin from './LotesAdmin'
import VendasAdmin from './VendasAdmin'
import PromocoesAdmin from './PromocoesAdmin'
import Avisos from './Avisos'


export default {
    name: 'AdminPages',
    components: { PageTitle, ItensAdmin, LotesAdmin, VendasAdmin, PromocoesAdmin, Avisos }
}
</script>

<style>

</style>
