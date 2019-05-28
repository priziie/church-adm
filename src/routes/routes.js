
import Login from '../components/signin/Login.vue';
import Error from '../components/error/Error.vue';
import AddBau from '../components/bautismo/Agregar.vue';
import BusBau from '../components/bautismo/Buscar.vue';
import ModBau from '../components/bautismo/Modificar.vue';
import ImpBau from '../components/bautismo/Imprimir.vue';

import Addconf from '../components/confirmacion/Agregar.vue';
import Busconf from '../components/confirmacion/Buscar.vue';
import Modconf from '../components/confirmacion/Modificar.vue';
import Impconf from '../components/confirmacion/Imprimir.vue';

import Addmat from '../components/matrimonio/Agregar.vue';
import Busmat from '../components/matrimonio/Buscar.vue';
import Modmat from '../components/matrimonio/Modificar.vue';
import Impmat from '../components/matrimonio/Imprimir.vue';

import Addusr from '../components/usuarios/Agregar.vue';
import Password from '../components/usuarios/Password.vue';

import Informacion from '../components/informacion/Informacion.vue';
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
                path:'/bautismo/agregar', 
                name: 'addbau',
                component: AddBau
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
            },
            {
                path:'/confirmacion/agregar', 
                name: 'addconf',
                component: Addconf
            },
            {
                path:'/confirmacion/buscar', 
                name: 'busconf',
                component: Busconf
            },
            {
                path:'/confirmacion/modificar', 
                name: 'modconf',
                component: Modconf
            },
            {
                path:'/confirmacion/imprimir', 
                name: 'impconf',
                component: Impconf
            },
            {
                path:'/matrimonio/agregar', 
                name: 'addmat',
                component: Addmat
            },
            {
                path:'/matrimonio/buscar', 
                name: 'busmat',
                component: Busmat
            },
            {
                path:'/matrimonio/modificar', 
                name: 'modmat',
                component: Modmat
            },
            {
                path:'/matrimonio/imprimir', 
                name: 'impmat',
                component: Impmat
            },
            {
                path:'/informacion', 
                name: 'info',
                component: Informacion
            },
            {
                path:'/usuarios/agregar', 
                name: 'addusr',
                component: Addusr
            },
            {
                path:'/usuarios/password', 
                name: 'chgpwd',
                component: Password
            }
        ]
    },
    {path:'/login', name: 'login', component: Login},
    {path:'/error', name: 'error', component: Error},
    
];