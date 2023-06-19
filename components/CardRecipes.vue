<template>
  <v-card class="mx-5" max-width="344">
    <v-img src="/Recetas/Pay de Queso.jpg"></v-img>
    <v-card-text>
      <h2 class="text-h6 primary--text">{{ recipe.title }}</h2>
    </v-card-text>
    <v-card-title>
      <v-rating
        dense
        color="orange"
        background-color="orange"
        readonly
        class="mr-2"
        v-if="recipe && recipe.reviews && recipe.reviews[0]"
        :value="recipe.reviews[0].rating"
      ></v-rating>
      <v-rating
        dense
        color="orange"
        background-color="orange"
        readonly
        class="mr-2"
        v-else
      ></v-rating>
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
            <v-card-title class="text-h5 primary white--text" dark>
              {{ recipe.title }}
              <v-spacer></v-spacer>
              <div>
                <v-btn class="ma-2" color="black" icon @click="dialog = false">
                  <v-icon> mdi-close-octagon-outline </v-icon>
                </v-btn>
              </div> </v-card-title
            ><br />

            <v-card-text>
              {{ recipe }}
              <h3>Descrpcion</h3>
              <h5>{{ recipe.description }}</h5>
              <h3>Ingredientes</h3>

              <h5 v-for="(item, index) in ingredientsTranslated" :key="item.id">
                {{ item.name }}
              </h5>
              <h3>Procedimiento</h3>
              <h5 v-for="(process, index) in recipe.process">
                {{ index + 1 }} - {{ process }}
              </h5>

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
              <div class="text-center">
                <v-dialog v-model="dialog4" max-width="450px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      class="ma-4"
                      v-bind="attrs"
                      v-on="on"
                      color="blue"
                      @click="dialog4 = false"
                    >
                      Calificar
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="text-h5 primary">
                      Titulo de la receta </v-card-title
                    ><br />
                    <v-card-text>
                      <h2>Calificacion de la receta</h2>
                      <br />
                      <v-row justify="space-between" align="center">
                        <v-col cols="8">
                          <div class="d-flex align-center">
                            <v-rating
                              :length="length"
                              v-model="rating"
                              dense
                              color="orange"
                              background-color="orange"
                              hover
                            ></v-rating>
                            <span class="font-weight-bold ml-2">
                              {{ rating }}
                            </span>
                          </div>
                        </v-col>
                      </v-row>
                      <br />
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green" text @click="handleUpdateReview">
                        Confirmar
                      </v-btn>
                      <v-btn color="red" text @click="dialog4 = false">
                        Cancelar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <div class="text-center">
                  <v-dialog v-model="dialog2" width="900">
                    <v-card>
                      <v-card-title class="text-h5 primary">
                        Editar Receta </v-card-title
                      ><br />
                      <v-card-text>
                        <v-text-field
                          label="Titulo"
                          outlined
                          v-model="recipe.title"
                        ></v-text-field>
                        <v-textarea
                          label="Descrpcion"
                          auto-grow
                          outlined
                          rows="3"
                          row-height="25"
                          v-model="recipe.description"
                        ></v-textarea>
                        <v-row align="center" justify="space-between">
                          <h2>Procedimiento</h2>

                          <template>
                            <v-btn
                              text
                              color="blue"
                              class="ma-4"
                              @click="dialog3 = !dialog3"
                            >
                              Agregar Paso
                            </v-btn>
                          </template>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row
                          v-for="(process, index) in recipe.process"
                          :key="index"
                        >
                          <v-col class="py-1">
                            <v-chip color="warning" text-color="white">
                              {{ process }}
                              <v-icon right small @click.stop="() => {}">
                                mdi-pencil
                              </v-icon>
                              <v-icon
                                right
                                small
                                @click.stop="deleteProcess(process)"
                              >
                                mdi-delete
                              </v-icon>
                            </v-chip>
                          </v-col>
                        </v-row>
                        {{ uniqueIdsTranslated }} <br />

                        <v-row>
                          <v-col>
                            <v-card>
                              <v-card-title>
                                Ingredientes
                                <v-spacer></v-spacer>
                                <v-text-field
                                  v-model="search"
                                  append-icon="mdi-magnify"
                                  label="Buscador"
                                  single-line
                                  hide-details
                                ></v-text-field>
                              </v-card-title>
                              <v-data-table
                                :headers="headers"
                                :items="uniqueIdsTranslated"
                                :search="search"
                                :single-select="true"
                                v-model="selected"
                                :items-per-page="5"
                                show-select
                                class="elevation-1"
                                item-key="name"
                                @item-selected="isSelected"
                              >
                                <template v-slot:item.type="{ item }">
                                  {{ translateType(item.type) }}
                                </template>
                              </v-data-table>
                              <div class="text-right pt-2">
                                <template>
                                  <v-btn
                                    color="blue"
                                    class="mr-2"
                                    text
                                    @click="dialog5 = !dialog5"
                                  >
                                    Nuevo Ingrediente
                                  </v-btn>
                                </template>
                              </div>
                            </v-card>
                          </v-col>
                        </v-row>
                        <br />
                        <template>
                          <v-data-table
                            :headers="headers2"
                            :items="translateIngredient"
                            sort-by="calories"
                            class="elevation-1"
                          >
                            <template v-slot:top>
                              <v-toolbar flat>
                                <v-toolbar-title
                                  >Ingredientes Seleccionados</v-toolbar-title
                                >
                                <v-divider
                                  class="mx-4"
                                  inset
                                  vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                              </v-toolbar>
                            </template>
                            <template v-slot:item.actions="{ item }">
                              <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                              >
                                mdi-pencil
                              </v-icon>
                              <v-icon small @click="deleteItem(item)">
                                mdi-delete
                              </v-icon>
                            </template>
                          </v-data-table>
                        </template>
                        <br />
                        <v-text-field
                          label="Porciones"
                          outlined
                          v-model.number="recipe.portions"
                        ></v-text-field>
                        <v-text-field
                          label="Tiempo de preparacion"
                          outlined
                        ></v-text-field>
                        <v-autocomplete
                          :items="dropdown_edit"
                          filled
                          label="Tipos de Comida"
                          v-model="recipe.nutritionCategory"
                        ></v-autocomplete>
                        <v-autocomplete
                          :items="dropdown_edit2"
                          filled
                          label="Posicion en el Menu"
                          v-model="recipe.timeCategory"
                          item-value="value"
                        ></v-autocomplete>
                      </v-card-text>
                      <v-divider></v-divider>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" text @click="dialog2 = false">
                          Cancelar
                        </v-btn>
                        <v-btn color="green" text @click="dialog2 = false">
                          Crear
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
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
  CreateIngredientInput,
  DeleteRecipeMutation,
  Ingredient,
  IngredientsFromList,
  UsersQuery,
  Recipe,
  UpdateReviewRecipeInput,
} from "~/gql/graphql";
import { Prop, Watch } from "vue-property-decorator";
const Auth = namespace("AuthModule");

const RecipesModule = namespace("RecipesModule");
@Component
export default class CardRecipes extends Vue {
  public dialog = false;
  public dialog2 = false;
  public dialog3 = false;
  public dialog4 = false;
  public nameIngredient = "";
  public typeIngredient = 0;
  public ingrediente = [];
  public cloneIngredients: Ingredient[] = [];
  public selectedIngredientsTable: {
    id: number;
    name: string;
    type: number;
    quantity: number;
    measure: number;
  }[] = [];
  public fab = false;
  public drawer = false;
  public dialogDelete = false;
  public dialog5 = false;
  public selected = [];
  public selectedIngredients: number[] = [];
  public length = 5;
  public rating = 1;
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
  public process = "";
  public allProcess: string[] = [];
  public editedIndex = -1;
  public editedItem: {
    name: string;
    type: number;
  } = {
    name: "",
    type: 0,
  };
  public search = "";
  public headers2 = [
    { text: "Nombre", value: "name" },
    { text: "Actions", value: "actions", sortable: false },
  ];
  public headers = [
    { text: "Nombre", value: "name" },
    { text: "Tipos", value: "type" },
  ];
  public desserts = [{}];
  public dropdown_edit2 = [
    { text: "Desayuno", value: 1 },
    { text: "Comida", value: 2 },
    { text: "Cena", value: 3 },
    { text: "Postre", value: 4 },
  ];
  public dropdown_edit = [
    { text: "Vegetariana", value: 1 },
    { text: "Vegana", value: 2 },
    { text: "omnívora", value: 3 },
  ];
  public items = [
    { text: "Solido", value: 1 },
    { text: "Liquido", value: 2 },
    { text: "Gaseoso", value: 3 },
  ];
  public cloneSelectedIngredientsTable: {
    id: number;
    name: string;
    type: number;
    quantity: number;
    measure: number;
  } = {
    id: 0,
    name: "",
    type: 0,
    measure: 0,
    quantity: 0,
  };

  async editItem(item: any) {
    this.cloneSelectedIngredientsTable = item;
    this.dialog = true;
  }

  async deleteItem(item: { name: string; type: number }) {
    console.log(item);
    this.editedItem = item;

    this.dialogDelete = true;
  }

  closeDialogProcess() {
    if (this.process != "") {
      this.dialog3 = false;
      this.allProcess.push(this.process);
      this.process = "";
    }
  }

  @Watch("selectedIngredients")
  onSelectedIngredientsChanged(newValue: string[], oldValue: string[]) {
    console.log("Selected ingredients:", newValue);
  }
  @RecipesModule.Action
  private createIngredient!: (data: CreateIngredientInput) => Promise<void>;
  @RecipesModule.Action
  private translateIngredientEdits!: (ids: number[]) => Promise<Ingredient[]>;
  @RecipesModule.Action
  private updateReview!: (data: UpdateReviewRecipeInput) => Promise<void>;
  async handleUpdateReview() {
    await this.updateReview({
      rating: this.rating,
      recipeId: this.recipe.id,
    });
    this.dialog4 = false;
    this.rating = this.rating;
  }

  async removee(item: { id: number; type: number }) {
    console.log(item);

    const index = this.selectedIngredients.indexOf(item.id);
    if (index >= 0) this.selectedIngredients.splice(index, 1);
  }

  public uniqueIdsTranslated = [];

  isSelected(item: any) {
    console.log(item);

    const index = this.cloneIngredients.findIndex((ingredient) => {
      console.log(ingredient);

      return (
        ingredient.name === item.item.name && ingredient.type === item.item.type
      );
    });

    if (index !== -1) {
      this.selectedIngredientsTable.push({
        id: Number(this.cloneIngredients[index].id),
        name: this.cloneIngredients[index].name,
        type: this.cloneIngredients[index].type,
        quantity: 1,
        measure: 0,
      });
      this.cloneIngredients.splice(index, 1);
    }
  }

  deleteIngredientOnSelect() {
    this.dialogDelete = false;
    const index = this.selectedIngredientsTable.findIndex((ingredient) => {
      console.log(ingredient);

      return (
        ingredient.name === this.editedItem.name &&
        ingredient.type === this.editedItem.type
      );
    });

    if (index !== -1) {
      this.cloneIngredients.push({
        id: this.selectedIngredientsTable[index].id.toString(),
        name: this.selectedIngredientsTable[index].name,
        type: this.selectedIngredientsTable[index].type,
      });
      this.selectedIngredientsTable.splice(index, 1);
    }
  }

  /*   allSelected(item: any) {
    this.selectedIngredientsTable = this.cloneIngredients;
    this.cloneIngredients.splice(0, this.cloneIngredients.length);
  } */

  deleteProcess(process: string) {
    this.allProcess.splice(this.allProcess.indexOf(process), 1);
  }

  openDialog2() {
    this.dialog2 = true;
    this.cloneIngredients = [...this.ingredients];
  }

  @Watch("ingredients")
  onIngredientsChanged(newValue: any, oldValue: any) {
    console.log(newValue);
    console.log(oldValue);
    console.log(this.ingredients);

    console.log("Watching ingredients");
    if (newValue) {
      this.cloneIngredients = [...this.ingredients];
    }
  }

  async createNewIngredient() {
    console.log(this.nameIngredient, this.typeIngredient);
    if (this.nameIngredient && this.typeIngredient) {
      await this.createIngredient({
        name: this.nameIngredient,
        type: this.typeIngredient,
      });
      this.dialog5 = false;
    }
  }

  translateType(type: number) {
    if (type === 1) {
      return "Solido";
    } else if (type === 2) {
      return "Liquido";
    } else if (type === 3) {
      return "Gaseoso";
    }
  }
  @RecipesModule.State("ingredients")
  private ingredients!: Ingredient[];
  @RecipesModule.Action
  fetchIngredientes!: () => Promise<void>;

  async mounted() {
    await this.fetchIngredientes();

    await this.cutIngredients();
    await this.translateIngredientSelected();
  }
  public translateIngredient = [];
  async translateIngredientSelected() {
    try {
      if (this.recipe) {
        const uniqueIdsTranslated = await this.translateIngredientEdits(
          this.recipe.ingredients
        );
        this.translateIngredient = uniqueIdsTranslated as never[];
      }
    } catch (error) {}
  }

  async cutIngredients() {
    try {
      if (this.ingredients) {
        const getIds = this.ingredients.map((ingredient) => {
          return Number(ingredient.id);
        });

        /*   const combinedIds = [...getIds, ...this.recipe.ingredients];
      const uniqueIds = combinedIds.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      return uniqueIds; */

        const uniqueIds = getIds.filter((value) => {
          return !this.recipe.ingredients.includes(value);
        });
        const uniqueIdsTranslated = await this.translateIngredientEdits(
          uniqueIds
        );
        this.uniqueIdsTranslated = uniqueIdsTranslated as never[];
      }
    } catch (error) {}
  }

  /*   async mounted() {
    await this.translateIngredients(this.recipe.ingredients);
  } */
}
</script>
