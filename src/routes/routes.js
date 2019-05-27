
import Login from '../components/signin/Login.vue';
import Error from '../components/error/Error.vue';
import AddBau from '../components/bautismo/Agregar.vue';
import BusBau from '../components/bautismo/Buscar.vue';
import ModBau from '../components/bautismo/Modificar.vue';
import Main from '../components/main/Main.vue'

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
                component: AddBau,
                meta:{
                    requiresAuth: true
                }
            },
            {
                path:'/bautismo/buscar', 
                name: 'busbau',
                component: BusBau,
                meta:{
                    requiresAuth: true
                }
            },
            {
                path:'/bautismo/modificar', 
                name: 'modbau',
                component: ModBau,
                meta:{
                    requiresAuth: true
                }
            }
        ]
    },
    {path:'/login', name: 'login', component: Login},
    {path:'/error', name: 'error', component: Error},
    
];