<template>
    <div class="login-page">
        <div class="form">
          <h3>Login</h3>
          <form class="login-form">
            <input type="text" v-model="username" placeholder="username"/>
            <input type="password" v-model="password" placeholder="password"/>
            <button @click="signIn">Ingresar</button>
            <p class="message">{{ msg }}</p>
          </form>
        </div>
    </div>
</template>

<script>
import {http} from '../../axios/common';
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

            http.post("usuarios/login", request)
            .then((response) => {
                
                console.log(response);
                // this.setToken(response.headers.authorization);
                // this.$router.replace('/');
            })
            .catch((error) => {
                console.log(error);
                let status = error.response.status;
                //redireccionar a error
                this.$router.replace('/error');
            });
        }
    }
}
</script>

<style scoped src="./style.css"></style>
