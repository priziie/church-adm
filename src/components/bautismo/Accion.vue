<template>
    <div>
        <input type="button" value="Editar" @click="modify"/>
        <input type="button" value="Imprimir" @click="print"/>
    </div>    
</template>

<script>
import {setCookie} from '../../utils/cookie'
export default {
    name: 'accion',
    props: ['row'],
    methods:{
        modify: function(){
            // EventBus.$emit('id', this.row._id);
            setCookie('id_bautismo', this.row._id);
            this.$router.replace('/bautismo/modificar')
        },
        print: function(){
            // EventBus.$emit('id', this.row._id);
            setCookie('id_bautismo', this.row._id);
            this.$router.replace('/bautismo/imprimir')
        }
    }
}
</script>

<style>

</style>
