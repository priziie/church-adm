<template>
    <div>
    <!-- <router-link to="/confirmacion/modificar">Atrás</router-link> -->
    <div class="form-style-2">
        <label for="sacerdote"><span>A quién va dirigido</span>
        <textarea v-model="para" ></textarea>
        </label>
    </div>
    <input type="button" value="Imprimir" @click="imprimir"/>
        <div v-if="informacion && matrimonio" class="certificado">
            <div class="cabecera">
                <img v-bind:src="img" alt="">
                <h1>{{ informacion.nombre }}</h1>
                <hr>
                <h2>{{ informacion.direccion }}</h2>
                <h2>TEL. {{ informacion.telefono }}</h2>
            </div>

            <h1 class="titulo">ACTA DE MATRIMONIO ECLESIASTICO</h1>
            <div class="parrafos">
                <p>
                    El Infrascrito cura Párroco, por la presente HACE CONSTAR QUE: en el Libro de 
                    Matrimonios N°
                    {{ matrimonio.libro }}, página N° {{ matrimonio.pagina }}, 
                    se encuentra la que textualmente dice:
                </p>
                <p>
                    "En la {{informacion.nombre}} de {{ informacion.ciudad }}, el día 
                    {{ getDay(matrimonio.fecha) }}
                    del mes de {{ getMonth(matrimonio.fecha) }} del año {{ getYear(matrimonio.fecha) }}.
                     Previos los trámites de Derecho Civil y canónico, el señor 
                    {{matrimonio.esposo.nombre}} de {{matrimonio.esposo.edad}} años, hijo de 
                    {{padresEsposo}}, originario de {{matrimonio.esposo.origen}}, contrajo Matrimonio 
                    Eclesiástico con {{matrimonio.esposa.nombre}} de {{matrimonio.esposa.edad}} años, 
                    hija de {{padresEsposa}}, originaria de {{matrimonio.esposa.origen}}. 
                    Fueron testigos: {{matrimonio.esposo.testigo}} y {{matrimonio.esposa.testigo}}."
                </p>
                <p>
                    Se extiende la presente en la Oficina Parroquial 
                    {{ (para) ? "para " + para +", ": "" }} {{
                        (curdate.getDate() == 1) ? "a un día" : "a los "+ getDay(curdate) + " días"
                    }} del mes de {{getMonth(curdate)}} del año {{getYear(curdate)}}.
                </p>
                <div class="firma">
                    <b>{{informacion.parroco}}</b>
                    <br>
                    Párroco
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>

import {http} from '../../axios/common';
import {getCookie} from '../../utils/cookie';
import EventBus from '../../eventBus'
import {NumToTex} from '../../utils/NumToTex.js'

export default {
    data(){
        return{
            informacion: null,
            matrimonio: null,
            id: '',
            para: '',
            img: './img/cruz.png',
            curdate: new Date()
        }
    },
    computed:{
        padresEsposo(){
            if(this.matrimonio){
                if(this.matrimonio.esposo.padre && this.matrimonio.esposo.madre) 
                    return this.matrimonio.esposo.padre +" y de " +this.matrimonio.esposo.madre;
                return (this.matrimonio.esposo.padre) ? this.matrimonio.esposo.padre : this.matrimonio.esposo.madre;
            }
            return '';
        },
        padresEsposa(){
            if(this.matrimonio){
                if(this.matrimonio.esposa.padre && this.matrimonio.esposa.madre) 
                    return this.matrimonio.esposa.padre +" y de " +this.matrimonio.esposa.madre;
                return (this.matrimonio.esposa.padre) ? this.matrimonio.esposa.padre : this.matrimonio.esposa.madre;
            }
            return '';
        }
        
    },
    created(){
        this.getInfoParroquia();
        if(!getCookie('id_matrimonio')){
            this.$router.replace('/matrimonio/buscar');
            return;
        }
        this.id = getCookie('id_matrimonio');
        this.getInfo()
    },
    methods: {
        imprimir(){
            window.print();
        },
        getDay(date){

            const d = new Date(date);
            return NumToTex(d.getDate()).toLowerCase();
        },
        getMonth(date){
            const d = new Date(date);
            let meses= ['enero','febrero','marzo','abril','mayo','junio','julio','agosto',
            'septiembre','octubre','noviembre','diciembre'];
            return meses[d.getMonth()];
        },
        getYear(date){

            const d = new Date(date);
            return NumToTex(d.getFullYear()).toLowerCase();
        },
        getInfoParroquia(){
            http.get("informacion", {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                this.informacion = response.data.result;
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
        getInfo(){
            
            http.get("matrimonio/"+this.id, {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                this.matrimonio = response.data.result;
                
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

</style>
