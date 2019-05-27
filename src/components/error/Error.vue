<template>
<div>
    <div class="error-502__container">
        <div class="error-502">
            <div class="error-502__text">
                <h1>Ocurrió un Error <b>:(</b></h1>
                <h2><p>Regresar a la página <router-link to="/principal">principal</router-link>.</p></h2>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
/**/
.error-502__text{
    margin-top: 100px;
}
:root {
  --main-color: white;
  --stroke-color: #5d862e;
  --link-color: #29abe2;
}
/**/
h1 {
  text-align: center;
}
h2 {
  text-align: center;
}
.loading h1, .loading h2 {
  margin-top: 0px;
  opacity: 0;  
}

</style>
