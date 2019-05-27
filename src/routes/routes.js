
import Login from '../components/signin/Login.vue';
import Error from '../components/error/Error.vue';
import AddBau from '../components/bautismo/Agregar.vue';
import BusBau from '../components/bautismo/Buscar.vue';
import ModBau from '../components/bautismo/Modificar.vue';
import ImpBau from '../components/bautismo/Imprimir.vue';
import Main from '../components/main/Main.vue'
import Principal from '../components/main/Principal.vue'

export const routes =[
    {path:'*', redirect: '/'},
    {
        path:'/', 
        name: 'main',
        component: Main,
        meta:{
            requiresAuth: true
        },
        children:[
            {
                path:'/bautismo/agregar', 
                name: 'addbau',
                component: AddBau
            },
            {
                path:'/principal', 
                name: 'principal',
                component: Principal
            },
            {
                path:'/errorForm', 
                name: 'errorForm',
                component: Error
            },
            {
                path:'/bautismo/buscar', 
                name: 'busbau',
                component: BusBau
            },
            {
                path:'/bautismo/modificar', 
                name: 'modbau',
                component: ModBau
            },
            {
                path:'/bautismo/imprimir', 
                name: 'impbau',
                component: ImpBau
            }
        ]
    },
    {path:'/login', name: 'login', component: Login},
    {path:'/error', name: 'error', component: Error},
    
];