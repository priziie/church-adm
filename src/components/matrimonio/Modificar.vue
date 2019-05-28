<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Modificar partida de matrimonio</div>
    <form @submit.prevent="modify">
        <label for="libro"><span>No. Libro</span>
        <input type="text" name="libro" v-model="object.libro" /></label>

        <label for="pagina"><span>No. Página</span>
        <input type="text" name="pagina" v-model="object.pagina" /></label>

        <label for="fecha"><span>Fecha del matrimonio</span>
        <datepicker name="fecha" v-model="object.fecha" :disabledDates="disabledDates"></datepicker>
        </label>

        <br>
        <b>Esposo</b>
        <hr>

        <label for="nombrev"><span>Nombre</span>
        <input type="text" name="nombrev" v-model="object.esposo.nombre" /></label>
        
        <label for="edadv"><span>Edad</span>
        <input type="text" name="edadv" v-model="object.esposo.edad" /></label>

        <label for="madrev"><span>Madre</span>
        <input type="text" name="madrev" v-model="object.esposo.madre" /></label>

        <label for="padrev"><span>Padre</span>
        <input type="text" name="padrev" v-model="object.esposo.padre" /></label>

        <label for="origenv"><span>Originario de</span>
        <input type="text" name="origenv" v-model="object.esposo.origen" /></label>

        <label for="testigov"><span>Testigo</span>
        <input type="text" name="testigov" v-model="object.esposo.testigo" /></label>

        <br>
        <b>Esposa</b>
        <hr>

        <label for="nombreh"><span>Nombre</span>
        <input type="text" name="nombreh" v-model="object.esposa.nombre" /></label>
        
        <label for="edadh"><span>Edad</span>
        <input type="text" name="edadh" v-model="object.esposa.edad" /></label>

        <label for="madreh"><span>Madre</span>
        <input type="text" name="madreh" v-model="object.esposa.madre" /></label>

        <label for="padreh"><span>Padre</span>
        <input type="text" name="padreh" v-model="object.esposa.padre" /></label>

        <label for="origenh"><span>Originaria de</span>
        <input type="text" name="origenh" v-model="object.esposa.origen" /></label>
        
        <label for="testigoh"><span>Testigo</span>
        <input type="text" name="testigoh" v-model="object.esposa.testigo" /></label>


        <label style="clear:both" ><span> </span>
        <input type="submit" value="Agregar" /></label>

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
    components: {
        Datepicker
    },
    data(){
        return{
            object:{
                libro: '',
                pagina: '',
                fecha: '',
                esposo: {
                    nombre: '',
                    edad: '',
                    madre: '',
                    padre: '',
                    origen: '',
                    testigo: ''
                },
                esposa: {
                    nombre: '',
                    edad: '',
                    madre: '',
                    padre: '',
                    origen: '',
                    testigo: ''
                }
            },
            msg: '',
            disabledDates: {
                from: new Date()
            },
            exito: ''
        }
    },
    methods:{
        getInfo(){
            
            http.get("matrimonio/"+this.id, {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                const datos = response.data.result;
                
                console.log(datos.libro);
                //llenando valores
                this.object = datos;
                
            console.log(this.pagina, this.nombre)
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
            if(!this.object.libro || isNaN(this.object.libro)){
                this.msg ="Favor escribir el número de libro"
                return;
            }
            if(!this.object.pagina || isNaN(this.object.pagina)){
                this.msg ="Favor escribir el número de página"
                return;
            }
            
            if(!this.object.fecha){
                this.msg ="Debe llenar la fecha del matrimonio"
                return;
            }
            
            if(!this.object.esposo.nombre){
                this.msg ="Debe escribir el nombre del esposo"
                return;
            }
            
            if(!this.object.esposa.nombre){
                this.msg ="Debe escribir el nombre del esposo"
                return;
            }
            
            if(!this.object.esposo.edad || isNaN(this.object.esposo.edad)){
                this.msg ="Favor escribir la edad del esposo"
                return;
            }
            
            if(!this.object.esposa.edad || isNaN(this.object.esposa.edad)){
                this.msg ="Favor escribir la edad del esposa"
                return;
            }

            if(!this.object.esposo.origen){
                this.msg ="Favor escribir el origen del esposo"
                return;
            }

            if(!this.object.esposa.origen){
                this.msg ="Favor escribir el origen del esposa"
                return;
            }
            
            if(!this.object.esposo.madre && !this.object.esposo.padre){
                this.msg ="Favor escribir el nombre de la madre o el padre del esposo"
                return;
            }
            if(!this.object.esposa.origen){
                this.msg ="Favor escribir el origen del esposa"
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

            http.put('matrimonio/'+this.id, this.object,{
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
                    this.$router.replace('/matrimonio/buscar');
                }
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
    },
    created(){
        if(!getCookie('id_matrimonio')){
            this.$router.replace('/matrimonio/buscar');
            return;
        }
        this.id = getCookie('id_matrimonio');
        this.getInfo();
    }
}
</script>

<style>
.padrinos{
    float: right;
    margin: 0px 35%;
}
</style>
