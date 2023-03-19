<template>
  <v-app >
  <v-container fill-height  >
    <v-row align="center" justify="center" >
      <!-- <v-col class="col-md-10 offset-md-1"> -->
      <v-col class="pt-0 pb-2" xl="4" md="6" lg="6" sm="10" xs="12">
        <v-card class="elevation-2 pa-4"  rounded="lg" >
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-subtitle class="v-card-subtitle">
                <h4 class="text-h4 text text-center" style="color: rgba(184, 51, 255, 1);">
                  Recetario
                </h4>
                <h6 class="text-h6 text text-center" style="color: rgba(184, 51, 255, 1);">
                  Iniciar Sesión
                </h6>
              </v-card-subtitle>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    required
                    outlined
                    label="Correo eléctronico"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>

                  <v-text-field
                    required
                    outlined
                    label="Contraseña"
                    prepend-inner-icon="mdi-lock"
                    
                  ></v-text-field>
                  <v-row no-gutters>
                    <v-col cols="12" align="right">
                      <NuxtLink
                        class="text-subtitle-1 text text--darken-2"
                        style="text-decoration: none; color: rgba(184, 51, 255, 1);"
                        to="RecuContra"
                      >
                        <h4 class="text-subtitle-1 primary--text text--darken-2" >OLVIDE MI CONTRASEÑA</h4>
                      </NuxtLink>
                    </v-col>
                  </v-row>
                  <v-row justify="center" no-gutters>
                    <v-col cols="12">
                      <!--Mensaje de error-->
                    </v-col>
                  </v-row>
                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-btn
                        class="mx-auto col-md-11"
                        color="rgba(184, 51, 255, 1);"
                        dense
                        block
                      >
                        Iniciar Sesión
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row class="mx-auto" align="center" justify="center">
                   <span>
                      <NuxtLink
                        class="text-subtitle-1 primary--text text--darken-2"
                        style="text-decoration: none; color: rgba(184, 51, 255, 1);"
                        to="/Registro"
                      >
                        <h1 class="text-subtitle-1">NO TENGO UNA CUENTA</h1>
                      </NuxtLink>
                    </span>
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
  </v-app>
</template>

<script>

</script>

<style scoped>

#app{
  background-image: url("../assets/images/Login/login2.avif");
  background-size: cover;
  height: 100vh;
  width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.v-card{
  background: rgb(255, 255, 255) ;
}
.v-card-title {
  display: block !important;
}
.img {
  height: 22px;
  max-width: 15px;
}
.img-f {
  height: 18px;
  max-width: 15px;
}
</style>
