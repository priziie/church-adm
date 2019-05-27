<template>
    <div>
        <input type="button" value="Editar" @click="modify"/>
        <input type="button" value="Imprimir"/>
    </div>    
</template>

<script>
import EventBus from '../../eventBus'
export default {
    name: 'accion',
    props: ['row'],
    methods:{
        modify: function(){
            EventBus.$emit('id', this.row._id);
            this.$router.replace('/bautismo/modificar')
        }
    }
}
</script>

<style>

</style>
