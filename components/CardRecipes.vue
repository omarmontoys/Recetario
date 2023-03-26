<template>
  <v-card class="mx-5" max-width="344">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"></v-img>
    <v-card-text>
      <h2 class="text-h6 primary--text">{{ recipe.title }}</h2>
    </v-card-text>
    <v-card-title> </v-card-title>
    <v-card-action>
      <div class="text-center">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="ma-2"
              color="accent"
              dark
              rounded
              text
              v-model="dialog"
            >
              Mas informacion
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 primary" dark>
              {{ recipe.title }} </v-card-title
            ><br />

            <v-card-text>
              <h3>Descrpcion</h3>
              <h5>{{ recipe.description }}}</h5>
              <h3>Ingredientes</h3>
              <h5>{{ recipe.ingredients }}</h5>

              <h3>Procedimiento</h3>
              <h5>{{ recipe.process }}</h5>

              <h3>Porciones</h3>
              <h5>{{ recipe.portions }}</h5>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-action>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { Recipe } from "~/gql/graphql";
import { Prop } from "vue-property-decorator";

const RecipesModule = namespace("RecipesModule");
@Component
export default class CardRecipes extends Vue {
  public dialog = false;
  @Prop({
    required: false,
  })
  public recipe!: Recipe;
}
</script>
