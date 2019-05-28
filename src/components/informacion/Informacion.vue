<template>
    <div class="form-style-2">
        
        <div class="form-style-2-heading">Información de la parroquia</div>
        <form @submit.prevent="modify">
            <label for="nombre"><span>Nombre</span>
            <input type="text" name="nombre" v-model="object.nombre" /></label>

            <label for="direccion"><span>Dirección</span>
            <textarea name="direccion" v-model="object.direccion"></textarea></label>
            
            <label for="departamento"><span>Departamento</span>
            <input type="text" name="departamento" v-model="object.departamento" /></label>
            
            <label for="ciudad"><span>Ciudad</span>
            <input type="text" name="ciudad" v-model="object.ciudad" /></label>

            <label for="telefono"><span>Teléfono</span>
            <input type="text" name="telefono" v-model="object.telefono" /></label>
            
            <label for="parroco"><span>Párroco</span>
            <input type="text" name="parroco" v-model="object.parroco" /></label>
            
            <label style="clear:both" ><span> </span>
            <input type="submit" value="Modificar" /></label>

            <span class="msg">{{msg}}</span>
            
            <span class="exito">{{exito}}</span>
        </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {http} from '../../axios/common';
import {getCookie} from '../../utils/cookie';
export default {
    data(){
        return{
            object:{
                nombre: '',
                direccion: '',
                parroco: '',
                departamento: '',
                ciudad: '',
                telefono: ''
            },
            msg: '',
            exito: ''
        }
    },
    created(){
        this.getInfoParroquia();
    },
    methods:{
        getInfoParroquia(){
            http.get("informacion", {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                this.object = response.data.result;
            })
            .catch((error) => {
                let status = error.response.status;
                console.log(status);
                if(status == 440){
                    this.$router.replace('/login');
                    return;
                }
                //redireccionar a error
                this.$router.replace('/errorForm');
            });
        },
        validaciones: function(){
            if(!this.object.nombre || !this.object.direccion || !this.object.parroco
             || !this.object.departamento || !this.object.ciudad){
                this.msg ="Favor llenar todos los campos"
                return;
            }
            return true;
        },
        modify(){
            //validaciones
            if(!this.validaciones()){
                return;
            }

            this.msg = "";

            http.put('informacion', this.object,{
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) =>{
                console.log(response);
                if(response.status != 200){
                    this.msg = "Ocurrió un error al guardar"
                }
                else
                    this.exito = "Modificado correctamente"
            })
            .catch((error) => {
                let status = error.response.status;
                console.log(status);
                if(status == 440){
                    this.$router.replace('/login');
                    return;
                }
                //redireccionar a error
                this.$router.replace('/errorForm');
            });
        }
    }
}
</script>

