<template>
  <div>
    <!-- <router-link to="/confirmacion/modificar">Atrás</router-link> -->
    <div class="form-style-2">
      <label for="sacerdote">
        <span>A quién va dirigido</span>
        <textarea v-model="para"></textarea>
      </label>
    </div>
    <input type="button" value="Imprimir" @click="imprimir" />
    <div v-if="informacion && confirmacion" class="certificado">
      <img v-bind:src="img" alt />
      <div class="cabecera">
        <h1>{{ informacion.nombre }}</h1>
        <hr />
        <h2>{{ informacion.direccion }}</h2>
        <h2>TEL. {{ informacion.telefono }}</h2>
      </div>

      <h1 class="titulo">CERTIFICADO DE CONFIRMACION</h1>
      <div class="parrafos">
        <p>
          El infrascrito cura párroco, por la presente CERTIFICA QUE: en el
          Libro de Confirmaciones N°
          {{ confirmacion.libro }}, Página N° {{ confirmacion.pagina }}, asiento
          N° {{ confirmacion.asiento }}, se encuentra la que textualmente dice:
        </p>
        <p>
          En la {{ informacion.nombre }}, {{ informacion.ciudad }}, el día
          {{ getDay(confirmacion.fecha) }} del mes de
          {{ getMonth(confirmacion.fecha) }} del año
          {{ getYear(confirmacion.fecha) }}, administró el sacramento de la
          Confirmación el {{ confirmacion.sacerdote }} a:
          {{ confirmacion.nombre }}, que nació el día
          {{ getDay(confirmacion.nacimiento) }} del mes de
          {{ getMonth(confirmacion.nacimiento) }} del año
          {{ getYear(confirmacion.nacimiento) }}, hijo(a) de {{ padres }}. Sus
          padrinos: {{ padrinos }}.
        </p>
        <p>
          Se extiende la presente en la Oficina Parroquial
          {{ para ? "para " + para + ", " : "" }}
          {{
            curdate.getDate() == 1
              ? "a un día"
              : "a los " + getDay(curdate) + " días"
          }}
          del mes de {{ getMonth(curdate) }} del año {{ getYear(curdate) }}.
        </p>
        <div class="firma">
          <b>{{ informacion.parroco }}</b>
          <br />Párroco
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../axios/common";
import { getCookie } from "../../utils/cookie";
import EventBus from "../../eventBus";
import { NumToTex } from "../../utils/NumToTex.js";

export default {
  data() {
    return {
      informacion: null,
      confirmacion: null,
      id: "",
      para: "",
      img: "./img/membrete.png",
      curdate: new Date(),
    };
  },
  computed: {
    padres() {
      if (this.confirmacion) {
        if (this.confirmacion.padre && this.confirmacion.madre)
          return this.confirmacion.padre + " y de " + this.confirmacion.madre;
        return this.confirmacion.padre
          ? this.confirmacion.padre
          : this.confirmacion.madre;
      }
      return "";
    },
    padrinos() {
      if (this.confirmacion) {
        let conc = "";
        this.confirmacion.padrinos.forEach((p, i) => {
          conc += p;
          if (i == this.confirmacion.padrinos.length - 2) {
            // si es el antepenultimo
            //poner y en lugar de ,
            conc += " y ";
          } else if (i < this.confirmacion.padrinos.length - 1) conc += ", ";
        });
        return conc;
      }
      return "";
    },
  },
  created() {
    this.getInfoParroquia();
    if (!getCookie("id_confirmacion")) {
      this.$router.replace("/confirmacion/buscar");
      return;
    }
    this.id = getCookie("id_confirmacion");
    this.getInfo();
  },
  methods: {
    imprimir() {
      window.print();
    },
    getDay(date) {
      const d = new Date(date);
      return NumToTex(d.getDate()).toLowerCase();
    },
    getMonth(date) {
      const d = new Date(date);
      let meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];
      return meses[d.getMonth()];
    },
    getYear(date) {
      const d = new Date(date);
      return NumToTex(d.getFullYear())
        .replace("VEINTIÚN", "VEINTIUNO")
        .toLowerCase();
    },
    getInfoParroquia() {
      http
        .get("informacion", {
          headers: {
            Authorization: getCookie("token"),
          },
        })
        .then((response) => {
          this.informacion = response.data.result;
        })
        .catch((error) => {
          let status = error.response.status;
          console.log("status", status);
          if (status == 440) {
            this.$router.replace("/login");
            return;
          }
          //redireccionar a error
          this.$router.replace("/errorForm");
        });
    },
    getInfo() {
      http
        .get("confirmacion/" + this.id, {
          headers: {
            Authorization: getCookie("token"),
          },
        })
        .then((response) => {
          this.confirmacion = response.data.result;
        })
        .catch((error) => {
          let status = error.response.status;
          console.log(status);
          if (status == 440) {
            this.$router.replace("/login");
            return;
          }
          //redireccionar a error
          this.$router.replace("/errorForm");
        });
    },
  },
};
</script>

<style>
</style>
