<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Agregar usuario</div>
    <form @submit.prevent="add">
        <label for="username"><span>Usuario</span>
        <input type="text" name="username" v-model="object.username" /></label>

        <label for="nombre"><span>Nombre</span>
        <input type="text" name="nombre" v-model="object.nombre" /></label>

        <label for="password"><span>Password</span>
        <input type="password" name="password" v-model="object.password" /></label>

        <label for="email"><span>Email</span>
        <input type="text" name="email" v-model="object.email" /></label>


        <label style="clear:both" ><span> </span>
        <input type="submit" value="Agregar" /></label>

        <span class="msg">{{msg}}</span>
        
        <span class="exito">{{exito}}</span>
    </form>
    </div>
</template>

<script>
import {http} from '../../axios/common';
import {getCookie} from '../../utils/cookie';
export default {
    data(){
        return{
            msg: '',
            exito: '',
            object:{
                username: '',
                nombre: '',
                password: '',
                email: ''
            }
        }
    },
    methods:{
        validations(){
            if(!this.object.username || !this.object.nombre || !this.password){
                this.msg ="Favor llenar todos los campos"
                return;
            }
            return true;
        },
        limpiar(){
            this.object.username = '';
            this.object.nombre = '';
            this.object.password = '';
            this.object.email = '';
        },
        add(){

            if(!this.validaciones()){
                return;
            }

            this.msg = "";
            http.post('usuarios', this.object,{
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) =>{
                // console.log(response);
                if(response.status != 200){
                    this.msg = "Ocurrió un error al guardar"
                }
                else{
                    this.limpiar();
                    this.exito = "Guardado correctamente"
                }
            });
        }
    }
}
</script>

<style>

</style>
