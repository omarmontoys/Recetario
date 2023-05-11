<template>
  <v-card class="mx-5" max-width="344">
    <v-img src="/Recetas/Pay de Queso.jpg"></v-img>
    <v-card-text>
      <h2 class="text-h6 primary--text">{{ recipe.title }}</h2>
    </v-card-text>
    <v-card-title>
      <v-rating
        :value="4"
        dense
        color="orange"
        background-color="orange"
        readonly
        class="mr-2"
      ></v-rating>
      <span class="primary--text text-subtitle-2">64 Reviews</span>
    </v-card-title>
    <v-card-actions>
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
              @click="sendTranslateIngredients()"
            >
              Mas informacion
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 primary" dark>
              {{ recipe.title }}
              <v-spacer></v-spacer>
              <div>
                <v-btn class="ma-2" color="black" icon @click="dialog = false">
                  <v-icon> mdi-close-octagon-outline </v-icon>
                </v-btn>
              </div> </v-card-title
            ><br />

            <v-card-text>
              <h3>Descrpcion</h3>
              <h5>{{ recipe.description }}</h5>
              <h3>Ingredientes</h3>
              <h5 v-for="(item, index) in ingredientsTranslated" :key="item.id">
                {{ item.name }}
              </h5>
              <h3>Procedimiento</h3>
              <h5>{{ recipe.process }}</h5>

              <h3>Porciones</h3>
              <h5>{{ recipe.portions }}</h5>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <div class="text-center">
                <v-dialog v-model="dialog2" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      class="ma-2"
                      color="blue"
                      icon
                      @click="dialog2 = false"
                    >
                      <v-icon> mdi-square-edit-outline </v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="text-h5 primary" dark>
                      {{ recipe.title }}
                      <v-spacer></v-spacer>
                      <div>
                        <v-btn
                          class="ma-2"
                          color="black"
                          icon
                          @click="dialog2 = false"
                        >
                          <v-icon> mdi-close-octagon-outline </v-icon>
                        </v-btn>
                      </div> </v-card-title
                    ><br />

                    <v-card-text>
                      <h3>Descrpcion</h3>
                      <h5>{{ recipe.description }}</h5>
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
                      <div class="text-center">
                        <v-btn
                          class="ma-2"
                          color="blue"
                          icon
                          @click="dialog2 = false"
                        >
                          <v-icon> mdi-square-edit-outline </v-icon>
                        </v-btn>
                      </div>
                      <div class="text-center">
                        <v-btn
                          class="ma-2"
                          color="red"
                          icon
                          @click="dialog2 = false"
                        >
                          <v-icon> mdi-delete-empty </v-icon>
                        </v-btn>
                      </div>
                      <!--  <v-btn color="black" text @click="dialog = false"> Cerrar </v-btn> -->
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <div class="text-center">
                <v-dialog v-model="dialog3" max-width="450px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ma-4"
                      v-bind="attrs"
                      v-on="on"
                      color="red"
                      icon
                      @click="dialog3 = false"
                    >
                      <v-icon> mdi-delete-empty </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5 red">
                      Seguro que desea eliminar la receta? </v-card-title
                    ><br />

                    <v-card-actions>
                      <v-btn
                        color="red"
                        text
                        @click="handleDeleteRecipe(recipe.id)"
                      >
                        Confirmar
                      </v-btn>
                      <v-btn color="green" text @click="dialog3 = false">
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import {
  DeleteRecipeMutation,
  Ingredient,
  IngredientsFromList,
  Recipe,
} from "~/gql/graphql";
import { Prop } from "vue-property-decorator";

const RecipesModule = namespace("RecipesModule");
@Component
export default class CardRecipes extends Vue {
  public dialog = false;
  public dialog2 = false;
  public dialog3 = false;
  @Prop({
    required: false,
  })
  public recipe!: Recipe;

  @RecipesModule.Action
  private translateIngredients!: (ids: number[]) => Promise<void>;

  @RecipesModule.Action
  private deleteRecipe!: (data: { id: string }) => Promise<void>;
  async handleDeleteRecipe(Recipe: { id: string }) {
    await this.deleteRecipe(Recipe);
    this.dialog3 = false;
    this.dialog = false;
  }

  @RecipesModule.State("ingredientsTranslated")
  public ingredientsTranslated!: Ingredient;

  async sendTranslateIngredients() {
    await this.translateIngredients(this.recipe.ingredients);
  }

  /*   async mounted() {
    await this.translateIngredients(this.recipe.ingredients);
  } */
}
</script>
