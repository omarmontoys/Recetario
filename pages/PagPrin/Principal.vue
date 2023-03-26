<template>
  <v-app>
    <template>
      <v-card class="mx-auto overflow-hidden" height="25">
        <v-app-bar color="primary" dark app>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Recetario</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="logOut()">
            <v-icon>mdi-exit-to-app</v-icon>
          </v-btn>
        </v-app-bar>

        <v-navigation-drawer absolute temporary>
          <v-list nav dense>
            <v-list-item-group active-class="primary--text text--accent-4">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Account</v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </template>

    <main>
      <v-container>
        <v-row cols="12">
          <v-col cols="12">
            <div class="d-flex justify-center">
              <img src="../../assets/images/logos/PrincipalLogoSinfondo.png" />
            </div>
            <v-row class="pt-7">
              <v-col cols="4" v-for="(recipe, index) in recipes" :key="index">
                <card-recipes :recipe="recipe"> </card-recipes>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </main>
    <v-card-text style="height: 100px; position: unset" class="card_text">
      <v-fab-transition>
        <v-dialog v-model="dialog2" width="900">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              fixed
              bottom
              right
              fab
              v-bind="attrs"
              v-on="on"
              class="ma-4"
              dark
              rounded
              v-model="dialog2"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="text-h5 primary"> Crear Receta </v-card-title
            ><br />
            <v-card-text>
              <v-text-field
                label="Titulo"
                outlined
                v-model="recipeInput.title"
              ></v-text-field>
              <v-textarea
                label="Descrpcion"
                auto-grow
                outlined
                rows="3"
                row-height="25"
                v-model="recipeInput.description"
              ></v-textarea>
              <v-textarea
                label="Procedimiento"
                auto-grow
                outlined
                rows="3"
                row-height="25"
                v-model="recipeInput.process"
              ></v-textarea>
              <v-textarea
                label="Ingredientes"
                auto-grow
                outlined
                rows="3"
                row-height="25"
                v-model="recipeInput.ingredients"
              ></v-textarea>
              <v-text-field
                label="Porciones"
                single-line
                outlined
                v-model.number="recipeInput.portions"
              ></v-text-field>
              <v-autocomplete
                :items="dropdown_edit"
                filled
                label="Tipos de Comida"
                v-model="recipeInput.timeCategory"
              ></v-autocomplete>
              <v-autocomplete
                :items="dropdown_edit2"
                filled
                label="Tipos de Comida"
                v-model="recipeInput.nutritionCategory"
              ></v-autocomplete>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="dialog2 = false">
                Cancelar
              </v-btn>
              <v-btn color="primary" text @click="handleCreateRecipe()">
                Crear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-fab-transition>
    </v-card-text>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { CreateRecipeInput, LoginInput, Recipe } from "~/gql/graphql";
import CardRecipes from "~/components/CardRecipes.vue";

const RecipesModule = namespace("RecipesModule");
const Auth = namespace("AuthModule");
@Component({
  components: { CardRecipes },
})
export default class Principal extends Vue {
  public dialog2 = false;
  public dropdown_edit = [
    { text: "Vegetariana", value: 1 },
    { text: "Vegana", value: 2 },
    { text: "omnívora", value: 3 },
  ];
  public dropdown_edit2 = [
    { text: "Desayuno", value: 1 },
    { text: "Comida", value: 2 },
    { text: "Cena", value: 3 },
    { text: "Postre", value: 4 },
  ];

  public recipeInput: CreateRecipeInput = {
    description: "",
    ingredients: "",
    nutritionCategory: 0,
    portions: 0,
    process: "",
    timeCategory: 0,
    title: "",
  };
  @RecipesModule.State("recipes")
  private recipes!: Recipe[];

  @RecipesModule.Action
  private fetchRecipes!: () => Promise<void>;
  async created() {
    await this.fetchRecipes();
  }
  @RecipesModule.Action
  private CreateRecipes!: (data: CreateRecipeInput) => Promise<void>;

  async handleCreateRecipe() {
    await this.CreateRecipes(this.recipeInput);
    this.dialog2 = false;
  }
  @Auth.Action
  private logOut!: () => void;
}
</script>

<style>
.card_text {
  width: 150px;
  height: 150px;
  border-radius: 80%;
  margin: 30%;
  display: block;
}
</style>
