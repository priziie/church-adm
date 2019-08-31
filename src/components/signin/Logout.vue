<template>
    <div></div>
</template>

<script>
import {deleteCookie} from '../../utils/cookie' 
export default {
    created(){
        console.log("logout")
        deleteCookie('token');
        this.$router.replace('/login')
    }
}
</script>
