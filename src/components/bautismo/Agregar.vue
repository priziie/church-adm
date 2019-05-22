<template>
    <div class="form-style-2">
    <div class="form-style-2-heading">Agregar nueva partida</div>
    <form action="" method="post">
        <label for="libro"><span>No. Libro</span>
        <input type="text" name="libro" v-model="libro" /></label>

        <label for="pagina"><span>No. Página</span>
        <input type="text" name="pagina" v-model="pagina" /></label>

        <label for="asiento"><span>No. Asiento</span>
        <input type="text" name="asiento" v-model="asiento" /></label>

        <label for="sacerdote"><span>Sacerdote</span>
        <select name="sacerdote" >
            <option v-for="s in sacerdotes" :key="s.id" :value="s.id">
                {{ s.name }}
            </option>
        </select></label>

        <label for="nombre"><span>Nombre</span>
        <input type="text" name="nombre" v-model="nombre" /></label>

        <label for="bautismo"><span>Fecha de bautismo</span>
        <datepicker name="bautismo" v-model="bautismo"></datepicker></label>

        <label for="nacimiento"><span>Fecha de nacimiento</span>
        <datepicker name="nacimiento" v-model="nacimiento"></datepicker></label>

        <label for="padre"><span>Padre</span>
        <input type="text" name="padre" v-model="padre" /></label>

        <label for="madre"><span>Madre</span>
        <input type="text" name="madre" v-model="madre" /></label>

        <label for="padrinos"><span>Padrinos</span>
        <textarea name="padrinos" v-model="padrinos"></textarea></label>

        <label><span> </span><input type="submit" value="Submit" /></label>
    </form>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import {http} from '../../axios/common';
import {getCookie} from '../../axios/common';
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
            padrinos: '',
            sacerdote: '',
            sacerdotes: []
        }
    },
    methods:{
        getSacerdotes: function() {
            http.get("sacerdotes", {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                console.log(response);
                // this.sacerdotes = response.body;
            })
            .catch((error) => {
                console.log(error);
                let status = error.response.status;
                //redireccionar a error
                this.$router.replace('/error');
            });
        }
    },
    created(){
        this.getSacerdotes();
    }
}
</script>

<style>

</style>
