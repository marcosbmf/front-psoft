<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/joy.png" width="200" alt="Logo" />
           <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-model="user.name" type="text" placeholder="Nome">
            <input v-if="showSignup" v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input v-model="user.password" name="password" type="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword"
                type="password" placeholder="Confirme a Senha">

            <button class="reg" v-if="showSignup" @click="signup">Registrar</button>
            <button class="reg" v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

 
 <script>
 import { baseApiUrl, showError, userKey, axios} from '@/global'

 export default {
     name: 'Auth',
     data: function() {
         return {
             showSignup: false,
             user: {}
         }
     },
     methods: {
         signin() {
             console.log(this.user)
             this.user.token = "Basic " + btoa(this.user.name+ ":" + this.user.password);
             axios({
                 
                 url: `${baseApiUrl}protected/conta`,
                 method: "get",
                 headers:{
                     'Authorization': this.user.token
                 }
             })
                .then(res => {
                    axios.defaults.headers.common['Authorization'] = this.user.token;
                    res.data.token = this.user.token
                    console.log(res.data)
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(this.user.token))
                    if(res.data.admin){
                        this.$router.push({ path: '/admin'})
                    } else {
                        this.$router.push({ path: '/'})
                    }
                })
                .catch(() => {
                    this.user.token = "";
                    showError
                    })
         },
         signup() {
            console.log(this.user)
            if (this.user.confirmPassword === this.user.password) {
                let newUser = {username: null, password: null, admin: false}
                newUser.username = this.user.name
                newUser.password = this.user.password
                console.log(newUser)
                axios.post(`${baseApiUrl}public/conta`, newUser)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()
                        this.user = {}
                        this.showSignup = false
                    })
                    .catch(showError)
            } else {
                this.$toasted.global.defaultError({msg: `Senhas não conferem!`})
            }
      }
        
     } 

 }
 </script>
 
 <style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }

    .reg {
        width: auto;
    }
    
 </style>
 