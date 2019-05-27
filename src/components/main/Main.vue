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
                            }
                        ]
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

<style>
body,
html {
  margin: 0;
  padding: 0;
  
  /* background: #f8f6f6;
  color: #404040; */
  font-family: 'Lucida Grande', Verdana, sans-serif;
  /* font-size: 13px;
  font-weight: normal;
  line-height: 20px; */
}
body {
  background-color: #f2f4f7;
}
#demo {
  padding-left: 300px;
}
#demo.collapsed {
  padding-left: 50px;
}
.demo {
  padding: 30px 50px;
}
.badge-danger {
  background-color: #ff2a2a;
  color: #fff;
}
.container {
  max-width: 600px;
}
pre {
  color: #2a2a2e;
  background: #fff;
  border-radius: 2px;
  padding: 10px;
  overflow: auto;
}
.v-sidebar-menu{
  border-right: 1px solid #ddd;
}
.form-style-2-heading{
	font-weight: bold;
	/* font-style: italic; */
	border-bottom: 2px solid #ddd;
	margin-bottom: 20px;
	font-size: 16px;
	padding-bottom: 3px;
}
.form-style-2 label{
	display: block;
  margin: 0px 0px 15px 0px;
  font-size: 14px;
}
.form-style-2 label > span{
	width: 100px;
	/* font-weight: bold; */
	float: left;
	padding-top: 8px;
	padding-right: 5px;
}
.form-style-2 span.required{
	color:red;
}
.form-style-2 .tel-number-field{
	width: 40px;
	text-align: center;
}
.form-style-2 input[type='text'], .form-style-2 select{
	width: 48%;	
}
.form-style-2 input[type='text'], 
.form-style-2 .tel-number-field, 
.form-style-2 textarea, 
 .form-style-2 select{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	border: 1px solid #C2C2C2;
	box-shadow: 1px 1px 4px #EBEBEB;
	-moz-box-shadow: 1px 1px 4px #EBEBEB;
	-webkit-box-shadow: 1px 1px 4px #EBEBEB;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
	padding: 7px;
	outline: none;
}
.form-style-2 input[type='text']:focus, 
.form-style-2 .tel-number-field:focus, 
.form-style-2 textarea:focus,  
.form-style-2 select:focus{
	border: 1px solid rgb(83, 156, 185);
}
.form-style-2 textarea{
	height:100px;
	width: 55%;
}
.form-style-2 input[type=submit],
.form-style-2 input[type=button]{
	border: none;
	padding: 8px 15px 8px 15px;
	background: rgb(72, 143, 184);
	color: #fff;
	box-shadow: 1px 1px 4px #DADADA;
	-moz-box-shadow: 1px 1px 4px #DADADA;
	-webkit-box-shadow: 1px 1px 4px #DADADA;
	border-radius: 3px;
	-webkit-border-radius: 3px;
	-moz-border-radius: 3px;
}
.form-style-2 input[type=submit]:hover,
.form-style-2 input[type=button]:hover{
	background: rgb(57, 103, 129);
	color: #fff;
}

.msg{
    color: red;

}
.exito{
    color: #8dce29;
}
</style>