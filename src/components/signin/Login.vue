<template>
<div class="container">

    <div class="login-page">
        <div class="form">
          <h3>Login 2</h3>
          <form class="login-form">
            <input type="text" v-model="username" placeholder="username"/>
            <input type="password" v-model="password" placeholder="password"/>
            <button @click="signIn">Ingresar</button>
            <p class="message">{{ msg }}</p>
          </form>
        </div>
    </div>
</div>
</template>

<script>
import {http} from '../../axios/common';
import {setCookie} from '../../utils/cookie';
/* eslint-disable */
export default {
    data(){
        return{
            username: '',
            password: '',
            msg: ''
        }
    },
    methods:{
        signIn: function(){
            let request = {
                username: this.username,
                password: this.password
            };

            console.log("entroo")
            http.post("usuarios/login", request)
            .then((response) => {
                
                console.log(response.data.result);
                setCookie("token", response.data.result)
                // this.setToken(response.headers.authorization);
                this.$router.replace('/principal');
            })
            .catch((error) => {
                console.log(error);
                //redireccionar a error
                this.$router.replace('/error');
            });
        }
    }
}
</script>

<style scoped src="./style.css"></style>
