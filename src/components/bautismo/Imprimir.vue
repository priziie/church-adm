<template>
    <div>
    <div class="form-style-2">
        <label for="sacerdote"><span>A quién va dirigido</span>
        <textarea v-model="para" ></textarea>
        </label>
    </div>
    <input type="button" value="Imprimir" @click="imprimir"/>
        <div v-if="informacion && bautismo" class="certificado">
            <div class="cabecera">
                <img v-bind:src="img" alt="">

                <h1>{{ informacion.nombre }}</h1>
                <hr>
                <h2>{{ informacion.direccion }}</h2>
                <h2>TEL. {{ informacion.telefono }}</h2>
            </div>

            <h1 class="titulo">CERTIFICADO DE BAUTISMO</h1>
            <div class="parrafos">
                <p>
                    El infrascrito cura párroco, por la presente CERTIFICA QUE: en el Libro de Bautismo N°
                    {{ bautismo.libro }}, Pagina N° {{ bautismo.pagina }}, asiento N° {{ bautismo.asiento }},
                    se encuentra la que textualmente dice:
                </p>
                <p>
                    En la {{informacion.nombre}}, {{ informacion.ciudad }}, el día {{ getDay(bautismo.fecha) }}
                    del mes de {{ getMonth(bautismo.fecha) }} del año {{ getYear(bautismo.fecha) }}, el 
                    {{bautismo.sacerdote}}, bautizó solemnemente a: {{ bautismo.nombre }}, que nació el 
                    {{getDay(bautismo.nacimiento)}} del mes de {{getMonth(bautismo.nacimiento)}} del año 
                    {{getYear(bautismo.nacimiento)}}, hijo(a) de {{padres}}. Padrino(s): {{padrinos}}.
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
            bautismo: null,
            id: '',
            para: '',
            img: './img/membrete.png',
            curdate: new Date()
        }
    },
    computed:{
        padres(){
            if(this.bautismo){
                if(this.bautismo.padre && this.bautismo.madre) 
                    return this.bautismo.padre +" y de " +this.bautismo.madre;
                return (this.bautismo.padre) ? this.bautismo.padre : this.bautismo.madre;
            }
            return '';
        },
        padrinos(){
            if(this.bautismo){
                let conc = "";
                this.bautismo.padrinos.forEach((p,i) => {
                    conc += p;
                    if(i==this.bautismo.padrinos.length-2){
                        // si es el antepenultimo
                        //poner y en lugar de ,
                        conc += " y "
                    }
                    else if(i < this.bautismo.padrinos.length-1)
                        conc += ", "
                });
                return conc;
            }
            return '';
        }
    },
    created(){
        this.getInfoParroquia();
        if(!getCookie('id_bautismo')){
            this.$router.replace('/bautismo/buscar');
            return;
        }
        this.id = getCookie('id_bautismo');
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
            
            http.get("bautismos/"+this.id, {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                this.bautismo = response.data.result;
                
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
