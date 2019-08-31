<template>
    <div
    id="demo"
    :class="[{'collapsed' : collapsed}]"
    >
    <div class="demo">
      <div class="container">
        <router-view />
      </div>
      <sidebar-menu
        :menu="menu"
        :theme="selectedTheme"
        :collapsed="collapsed"
        @collapse="onCollapse"
        width="300px"
      />
    </div>
    </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    SidebarMenu
  },
  data(){
      return {
          menu: [
                    {
                        header: true,
                        title: 'Menú',
                        // component: componentName
                        // visibleOnCollapse: true
                        // class:''
                        // attributes: {}
                    },
                    {
                        title: 'Bautismo',
                        icon: 'fa fa-tint',
                        child: [
                            {
                                href: '/bautismo/buscar',
                                title: 'Buscar',
                            },
                            {
                                href: '/bautismo/agregar',
                                title: 'Agregar partida',
                            }
                        ]
                        // disabled: true
                        // class:''
                        // attributes: {}
                        // alias: '/path'
                        /*
                        badge: {
                            text: 'new',
                            // class:''
                            // attributes: {}
                        }
                        */
                    },
                    {
                        title: 'Confirmación',
                        icon: 'fa fa-dove',
                        child: [
                            {
                                href: '/confirmacion/buscar',
                                title: 'Buscar',
                            },
                            {
                                href: '/confirmacion/agregar',
                                title: 'Agregar',
                            }
                        ]
                    },
                    {
                        title: 'Matrimonio',
                        icon: 'fa fa-heart',
                        child: [
                            {
                                href: '/matrimonio/buscar',
                                title: 'Buscar',
                            },
                            {
                                href: '/matrimonio/agregar',
                                title: 'Agregar',
                            }
                        ]
                    },
                    {
                        title: 'Información',
                        icon: 'fa fa-church',
                        href: '/informacion'
                    },
                    {
                        title: 'Usuarios',
                        icon: 'fa fa-user',
                        child: [
                            {
                                href: '/usuarios/password',
                                title: 'Cambiar contraseña',
                            },
                            {
                                href: '/usuarios/agregar',
                                title: 'Agregar',
                            }
                        ]
                    },
                    {
                        title: 'Cerrar sesión',
                        icon: 'fa fa-door-closed',
                        href: '/logout'
                    }
            ],
        selectedTheme: 'white-theme',
        collapsed: false
      }
  },
  methods:{
    onCollapse (collapsed) {
      console.log(collapsed)
      this.collapsed = collapsed
    }
  }
}

</script>

<style src="./style.css"></style>