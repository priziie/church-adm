import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import {routes} from './routes/routes'
import {getCookie} from './utils/cookie';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatatableFactory from 'vuejs-datatable';

Vue.use(VueRouter)
DatatableFactory.useDefaultType( false )
	.registerTableType( 'datatable', tableType => {
    console.log("estoy ejecutnado")
		tableType.mergeSettings( {
			table: {
				class:   'table table-hover table-striped',
				sorting: {
					sortNone: '<i class="fa fa-sort"></i>',
					sortAsc:  '<i class="fa fa-sort-up"></i>',
					sortDesc: '<i class="fa fa-sort-down"></i>',
				},
			},
			pager: {
				classes: {
					pager:    'pagination',
          selected: 'active',
          li: 'page-item'
				},
				icons: {
					previous: '<i class="fa fa-angle-right"></i>',
					next:     '<i class="fa fa-angle-left"></i>',
				},
			},
		} );
  } );

Vue.use(DatatableFactory);
  
Vue.config.productionTip = false


const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) =>{
  let reqAuth = to.matched.some(record=> record.meta.requiresAuth);

  // console.log(reqAuth);
  // console.log(to);


  let currentUser = getCookie('token');

  if(reqAuth && !currentUser) next('/login')
  else next()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
  
