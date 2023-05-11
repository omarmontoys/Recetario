<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <!-- <v-col class="col-md-10 offset-md-1"> -->
      <v-col class="pt-0 pb-2" xl="4" md="6" lg="6" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" outlined rounded="lg">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-subtitle class="v-card-subtitle">
                <h4
                  class="text-h4 text text-center"
                  style="color: rgba(184, 116, 72, 1)"
                >
                  Recetario
                </h4>
                <h6
                  class="text-h6 text text-center"
                  style="color: rgba(198, 125, 77, 1)"
                >
                  Cambiar Contraseña
                </h6>
              </v-card-subtitle>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    required
                    outlined
                    label="Correo Electronico"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-row justify="center" no-gutters>
                    <v-col cols="12">
                      <!--Mensaje de error-->
                    </v-col>
                  </v-row>

                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-btn
                        class="mx-auto col-md-11"
                        color="primary"
                        dense
                        block
                        @click="CambiarContraa()"
                      >
                        Continuar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <!--  </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    CambiarContraa() {
      this.$router.push("/CambiarContra");
    },
  },
};
</script>

<style scoped>
#app {
  background-image: url("../assets/images/Login/login2.avif");
  background-size: cover;
  height: 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.v-card {
  background: rgba(255, 255, 255, 0.468) !important;
}
.v-card-title {
  display: block !important;
}
.img {
  height: 19px;
  max-width: 15px;
}
.img-f {
  height: 18px;
  max-width: 15px;
}
</style>
