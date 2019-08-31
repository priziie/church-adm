<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Cambiar contraseña</div>
    <form @submit.prevent="modify">

        <label for="password"><span>Nueva contraseña</span>
        <input type="password" name="password" v-model="password" /></label>

        <label for="repeatpwd"><span>Confirmar contraseña</span>
        <input type="password" name="repeatpwd" v-model="repeatpwd" /></label>


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
            password: '',
            repeatpwd: ''
        }
    },
    methods:{
        validaciones(){
            if(!this.password || !this.repeatpwd){
                this.msg ="Favor llenar todos los campos"
                return;
            }
            if(this.password != this.repeatpwd){
                this.msg = "Las contraseñas no coinciden"
                return;
            }
            return true;
        },
        limpiar(){
            this.repeatpwd = '';
            this.password = '';
        },
        modify(){

            if(!this.validaciones()){
                return;
            }

            this.msg = "";
            http.post('usuarios/password', {
                password: this.password
            },{
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) =>{
                console.log(response);
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
