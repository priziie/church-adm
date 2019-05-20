
import Login from '../components/signin/Login.vue';
import Error from '../components/error/Error.vue';
import AddBau from '../components/bautismo/Agregar.vue';

export const routes =[
    {path:'*', redirect: '/'},
    {path:'/login', name: 'login', component: Login},
    {path:'/error', name: 'error', component: Error},
    {
        path:'/bautismo/agregar', 
        name: 'addbau',
        component: AddBau
        // meta:{
        //     requiresAuth: true
        // }
    }
];