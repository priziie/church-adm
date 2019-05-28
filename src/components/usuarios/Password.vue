<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Cambiar contraseña</div>
    <form @submit.prevent="modify">
        <label for="usuario"><span>Contraseña anterior</span>
        <input type="text" name="usuario" v-model="object.usuario" /></label>

        <label for="nombre"><span>Nueva contraseña</span>
        <input type="text" name="nombre" v-model="object.nombre" /></label>

        <label for="password"><span>Confirmar contraseña</span>
        <input type="password" name="password" v-model="object.password" /></label>


        <label style="clear:both" ><span> </span>
        <input type="submit" value="Cambiar" /></label>

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
            username: '',
            password: '',
            repeatpass: ''
        }
    },
    methods:{
        validations(){
            if(!this.object.username || !this.object.password || !this.repeatpass){
                this.msg ="Favor llenar todos los campos"
                return;
            }
            if(this.object.password != this.object.repeatpass){
                this.msg = "Las contraseñas no coinciden"
                return;
            }
            return true;
        },
        limpiar(){
            this.username = '';
            this.repeatpass = '';
            this.password = '';
        },
        add(){

            if(!this.validaciones()){
                return;
            }

            this.msg = "";
            http.post('usuarios/password', {
                username: this.username,
                password: this.password
            },{
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
