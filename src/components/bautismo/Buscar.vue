<template>
    <div>
        <div class="form-style-2-heading">Búsqueda de fe de bautismo</div>
        
        <div class="row">
            <div class="col-xs-12 form-inline">
                <div class="form-group">
                    <label for="filter" class="sr-only">Filtrar</label>
                    <input type="text" class="form-control" v-model="filter" placeholder="Filter">
                </div>
            </div>
        </div>

        <div class="row">
            <div id="table" class="col-xs-12 table-responsive">
                <datatable :columns="columns" :data="rows" :filter-by="filter"></datatable>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 form-inline">
                <datatable-pager v-model="page" type="abbreviated" :per-page="per_page"></datatable-pager>
            </div>
        </div>
    </div>
</template>


<script>
import {http} from '../../axios/common';
import {getCookie} from '../../utils/cookie';
import Accion from './Accion.vue'

export default {
    data(){
        return{
            filter: '',
            columns: [
                { label: 'Acción', component: Accion},
                { label: 'No. Libro', field: 'libro', align: 'center' },
                { label: 'No. Página', field: 'pagina' },
                { label: 'No. Asiento', field: 'asiento' },
                { label: 'Nombre', field: 'nombre' },
                { label: 'Sacerdote', field: 'sacerdote' },
                { label: 'Fecha Bautismo', representedAs: function (row) {
                        let date = new Date(row.fecha)
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        return date.toLocaleDateString('es-SV', options);
                    } 
                },
                { label: 'Fecha de nacimiento', representedAs: function (row) {
                        let date = new Date(row.nacimiento)
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        return date.toLocaleDateString('es-SV', options);
                    } 
                },
                { label: 'Madre', field: 'madre', filterable: false },
                { label: 'Padre', field: 'padre', filterable: false }
            ],
            rows: [],
            page: 1,
            per_page: 5
        }
    },
    methods: {
        get: function() {
            http.get("bautismos", {
                headers: {
                    'Authorization': getCookie('token')
                }
            })
            .then((response) => {
                
                console.log(response);
                this.rows = response.data.result;
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
        this.get();
    }
}
</script>

<style>
</style>
