<template>
    <div class="form-style-2">
        
    <div class="form-style-2-heading">Modificar partida</div>
    <form @submit.prevent="modify">
        <label for="libro"><span>No. Libro</span>
        <input type="text" name="libro" v-model="libro" /></label>

        <label for="pagina"><span>No. Página</span>
        <input type="text" name="pagina" v-model="pagina" /></label>

        <label for="asiento"><span>No. Asiento</span>
        <input type="text" name="asiento" v-model="asiento" /></label>

        <label for="sacerdote"><span>Sacerdote</span>
        <select name="sacerdote" v-model="sacerdote" >
            <option value="-">Seleccione un sacerdote</option>
            <option v-for="s in sacerdotes" :key="s._id" :value="s.nombre">
                {{ s.nombre }}
            </option>
        </select></label>

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
import {getCookie} from '../../axios/common';
import EventBus from '../../eventBus'

export default {
    components: {
        Datepicker
    },
    data(){
        return{
            id: '',
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
            sacerdote: '-',
            sacerdotes: [],
            msg: '',
            disabledDates: {
                from: new Date()
            },
            exito: ''
        }
    },
    methods:{
        getSacerdotes() {
            http.get("sacerdotes", {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                this.sacerdotes = response.data.result;
            })
            .catch((error) => {
                let status = error.response.status;
                console.log(status);
                if(status == 440){
                    this.$router.replace('/login');
                    return;
                }
                //redireccionar a error
                this.$router.replace('/error');
            });
        },
        getInfo(id){
            console.log("entre a get info")
            http.get("bautismos/"+id, {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                const data = response.data.result;
                
                console.log(data);
                //llenando valores
                this.libro= data.libro,
                this.pagina= data.pagina,
                this.asiento= data.asiento,
                this.nombre= data.nombre,
                this.nacimiento= data.nacimiento,
                this.bautismo= data.fecha,
                this.madre= data.madre,
                this.padre= data.padre,
                this.padrinos= data.padrinos,
                this.sacerdote= data.sacerdote
            })
            .catch((error) => {
                let status = error.response.status;
                console.log(status);
                if(status == 440){
                    this.$router.replace('/login');
                    return;
                }
                //redireccionar a error
                this.$router.replace('/error');
            });
        },
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
            
            if(!this.sacerdote || this.sacerdote == ''){
                this.msg ="Seleccione un sacerdote"
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
        modify(){
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
                padrinos: this.padrinos.map(x=> x.value)
            };

            console.log(object);
            http.put('bautismos/'+this.id, object,{
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
                    this.exito = "Modificado exitosamente"
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
                    this.sacerdote= '-'
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
                this.$router.replace('/error');
            });
        }
    },
    mounted(){
        this.getSacerdotes();
        EventBus.$on('id', (id) => {
            this.id = id;
            console.log(id)
            this.getInfo(id)
        })
    }
}
</script>

<style>
.padrinos{
    float: right;
    margin: 0px 35%;
}
</style>
