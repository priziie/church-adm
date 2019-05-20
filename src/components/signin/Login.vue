<template>
<div>
    <!-- <div class="login-page">
        <div class="form">
          <h3>Login</h3>
          <form class="login-form">
            <input type="text" v-model="username" placeholder="username"/>
            <input type="password" v-model="password" placeholder="password"/>
            <button @click="signIn">Ingresar</button>
            <p class="message">{{ msg }}</p>
          </form>
        </div>
    </div> -->
    <div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
      <p class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2019 Acme Corp. All rights reserved.
  </p>
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

<!--style scoped src="./style.css"></style-->
<style>

</style>

