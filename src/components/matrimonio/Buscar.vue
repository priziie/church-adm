<template>
    <div>
        <div class="form-style-2-heading">Búsqueda de matrimonios</div>
        
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
                { label: 'Acción', component: Accion, filterable: false},
                { label: 'No. Libro', field: 'libro', align: 'center' },
                { label: 'No. Página', field: 'pagina' },
                { label: 'Fecha Matrimonio', representedAs: function (row) {
                        let date = new Date(row.fecha)
                        let options = { year: 'numeric', month: 'long', day: 'numeric' };
                        return date.toLocaleDateString('es-SV', options);
                    } 
                },
                { label: 'Esposo', field: 'esposo.nombre' },
                { label: 'Padre esposo', field: 'esposo.padre', filterable: false },
                { label: 'Madre esposo', field: 'esposo.madre', filterable: false },
                { label: 'Esposa', field: 'esposa.nombre' },
                { label: 'Padre esposa', field: 'esposa.padre', filterable: false },
                { label: 'Madre esposa', field: 'esposa.madre', filterable: false },
            ],
            rows: [],
            page: 1,
            per_page: 10
        }
    },
    methods: {
        get: function() {
            http.get("matrimonio", {
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
