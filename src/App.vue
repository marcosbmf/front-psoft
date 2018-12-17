<template>
    <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
        <Header title="CCC PHARMA" 
			:hideToggle="!user"
            :hideItens="!user"
			:hideUserDropdown="!user"/>
        <Content/>
        <Footer />
    </div> 
</template>

<script>
import { mapState } from 'vuex'
import { baseApiUrl, userKey, axios} from "@/global"
import Header from "@/components/template/Header"
import Menu from "@/components/template/Menu"
import Content from "@/components/template/Content"
import Footer from "@/components/template/Footer"
import Loading from "@/components/template/Loading"

export default {
    name: "App", 
	components: { Header, Menu, Content, Footer },
    computed: mapState(['isMenuVisible', 'user']),
    data: function () {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

             const json = localStorage.getItem(userKey)
             const userData = JSON.parse(json)
             this.$store.commit('setUser', null)

            if(!userData) {
                this.validatingToken = false
                this.$router.push({ name:'auth'})
                return
            }

            const res = await axios({
                 
                 url: `${baseApiUrl}protected/conta`,
                 method: "get",
                 headers:{
                     'Authorization': userData
                 }
             })

            if(res.data) {
                res.data.acessToken = userData;
                this.$store.commit('setUser', res.data)
            } else {
                localStorage.removeItem(userKey)
                this.$router.push({ name: 'auth'})
            }

             this.validatingToken = false
        }
    },
    created() {
        this.validateToken()
    }
}
</script>

<style>
    * {
        font-family: "Lato", sans-serif;
    }

    body {
        margin: 0;
    }

    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 60px 1fr 40px;
        grid-template-columns: 300px 1fr;
        grid-template-areas: 
             "header header"
            "content content"
            "footer  footer";
    }

</style>