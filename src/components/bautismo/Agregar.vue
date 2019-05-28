<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Agregar nueva partida de bautismo</div>
    <form @submit.prevent="add">
        <label for="libro"><span>No. Libro</span>
        <input type="text" name="libro" v-model="libro" /></label>

        <label for="pagina"><span>No. Página</span>
        <input type="text" name="pagina" v-model="pagina" /></label>

        <label for="asiento"><span>No. Asiento</span>
        <input type="text" name="asiento" v-model="asiento" /></label>

        <label for="sacerdote"><span>Sacerdote</span>
        <input type="text" name="sacerdote" v-model="sacerdote" /></label>

        <label for="nombre"><span>Nombre</span>
        <input type="text" name="nombre" v-model="nombre" /></label>

        <label for="bautismo"><span>Fecha de bautismo</span>
        <datepicker name="bautismo" v-model="bautismo" :disabledDates="disabledDates"></datepicker></label>

        <label for="nacimiento"><span>Fecha de nacimiento</span>
        <datepicker name="nacimiento" v-model="nacimiento" :disabledDates="disabledDates"></datepicker></label>

        <label for="padre"><span>Padre</span>
        <input type="text" name="padre" v-model="padre" /></label>

        <label for="madre"><span>Madre</span>
        <input type="text" name="madre" v-model="madre" /></label>

        
        <label v-for="(p,i) in padrinos" :key="i">
            <span>Padrino {{i+1}}</span>
            <input type="text" v-model="p.value" /> 
        </label>
        <input type="button" class="padrinos" @click="padrinos.push({value: ''})" value="más padrinos" />
        

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
            libro: '',
            pagina: '',
            asiento: '',
            nombre: '',
            nacimiento: '',
            bautismo: '',
            madre: '',
            padre: '',
            padrinos: [{
                value: ''
            }],
            sacerdote: '',
            msg: '',
            disabledDates: {
                from: new Date()
            },
            exito: ''
        }
    },
    methods:{
        
        validaciones: function(){
            if(!this.asiento || isNaN(this.asiento)){
                this.msg ="Favor escribir el asiento"
                return;
            }
            if(!this.libro || isNaN(this.libro)){
                this.msg ="Favor escribir el número de libro"
                return;
            }
            if(!this.pagina || isNaN(this.pagina)){
                this.msg ="Favor escribir el número de página"
                return;
            }
            
            if(!this.bautismo){
                this.msg ="Debe llenar la fecha de bautismo"
                return;
            }
            
            if(!this.sacerdote){
                this.msg ="Debe escribir el nombre de un sacerdote"
                return;
            }
            
            if(!this.nombre){
                this.msg ="Favor escribir el nombre del bautizado"
                return;
            }
            
            if(!this.nacimiento){
                this.msg ="Debe llenar la fecha de nacimiento del bautizado"
                return;
            }

            //validar fechas que no sea la del bautismo antes que la de nacimiento
            if(this.bautismo < this.nacimiento){
                this.msg ="La fecha de bautismo no puede ser menor a la de nacimiento";
                return;
            }
            
            if(!this.pagina){
                this.msg ="Debe llenar el campo pagina"
                return;
            }
            
            if(!this.madre && !this.padre){
                this.msg ="Favor escribir el nombre de la madre o el padre del bautizado"
                return;
            }
            return true;
        },
        add: function(){
            //validaciones
            if(!this.validaciones()){
                return;
            }

            this.msg = "";
            let object = {
                asiento: this.asiento,
                libro: this.libro,
                pagina: this.pagina,
                fecha: this.bautismo,
                sacerdote: this.sacerdote,
                nombre: this.nombre,
                nacimiento: this.nacimiento,
                madre: this.madre,
                padre: this.padre,
                padrinos: this.padrinos.filter(x=> x.value != '').map(x=> x.value)
            };

            // console.log(object);
            http.post('bautismos', object,{
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
                    this.exito = "Guardado exitosamente"
                    //limpiando vars
                    this.libro= '',
                    this.pagina= '',
                    this.asiento= '',
                    this.nombre= '',
                    this.nacimiento= '',
                    this.bautismo= '',
                    this.madre= '',
                    this.padre= '',
                    this.padrinos= [{
                        value: ''
                    }],
                    this.sacerdote= ''
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
    }
}
</script>

<style>
.padrinos{
    float: right;
    margin: 0px 35%;
}
</style>
