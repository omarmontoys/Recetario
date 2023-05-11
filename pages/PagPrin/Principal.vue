<template>
  <v-container>
    <v-row cols="12">
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../assets/images/logos/PrincipalLogoSinfondo.png" />
        </div>
        <v-row class="pt-7" v-if="me && me.recipes">
          <v-col cols="4" v-for="(recipe, index) in me.recipes" :key="index">
            <CardRecipes :recipe="recipe" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-speed-dial
      color="primary"
      fixed
      bottom
      right
      fab
      class="ma-4"
      dark
      rounded
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="primary darken-1" dark fab>
          <v-icon> mdi-swap-vertical-bold </v-icon>
        </v-btn>
      </template>

      <template>
        <v-btn
          fab
          dark
          small
          color="primary"
          class="ma-4"
          rounded
          @click="openDialog2()"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-snackbar v-model="snackbarSucessCreateRecipe">
        {{ snackbarSucessMessageCreateRecipe }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="green"
            text
            v-bind="attrs"
            @click="changeStatusSnackbarCreateRecipe()"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <template>
        <v-btn
          fab
          dark
          small
          color="orange"
          class="ma-4"
          rounded
          @click="dialog4 = !dialog4"
        >
          <v-icon>mdi-virus-outline</v-icon>
        </v-btn>
      </template>

      <!-- <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn> -->
    </v-speed-dial>
    <v-dialog v-model="dialog2" width="900">
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
          <v-row align="center" justify="space-between">
            <h2>Procedimiento</h2>

            <template>
              <v-btn text color="blue" class="ma-4" @click="dialog3 = !dialog3">
                Agregar Paso
              </v-btn>
            </template>
          </v-row>
          <v-divider></v-divider>
          <!--      <v-textarea
            label="Procedimiento"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            v-model="allProcess"
            disabled
          ></v-textarea> -->
          <v-row v-for="(process, index) in allProcess" :key="index">
            <v-col class="py-1">
              <v-chip color="warning" text-color="white">
                {{ index + 1 }} {{ process }}
                <v-icon right small @click.stop="() => {}"> mdi-pencil </v-icon>
                <v-icon right small @click.stop="deleteProcess(process)">
                  mdi-delete
                </v-icon>
              </v-chip>
            </v-col>
          </v-row>
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
                  :items="cloneIngredients"
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
              :items="selectedIngredientsTable"
              sort-by="calories"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Ingredientes Seleccionados</v-toolbar-title>
                  <v-divider class="mx-4" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
              </template>
            </v-data-table>
          </template>
          <br />
          <v-text-field
            label="Porciones"
            outlined
            v-model.number="recipeInput.portions"
          ></v-text-field>
          <v-text-field label="Tiempo de preparacion" outlined></v-text-field>
          <v-autocomplete
            :items="dropdown_edit"
            filled
            label="Tipos de Comida"
            v-model="recipeInput.nutritionCategory"
          ></v-autocomplete>
          <v-autocomplete
            :items="dropdown_edit2"
            filled
            label="Posicion en el Menu"
            v-model="recipeInput.timeCategory"
            item-value="value"
          ></v-autocomplete>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog2 = false"> Cancelar </v-btn>
          <v-btn color="green" text @click="handleCreateRecipe()">
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog5" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 primary">
          Nuevo Ingrediente
          <v-spacer></v-spacer>
        </v-card-title>
        <br />
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Ingrediente"
                outlined
                filled
                v-model="nameIngredient"
              ></v-text-field
            ></v-col>

            <v-col cols="12" md="6">
              <v-autocomplete
                :items="items"
                dense
                filled
                label="Tipo"
                v-model="typeIngredient"
              ></v-autocomplete
            ></v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog5 = false"> Cancelar </v-btn>
          <v-btn color="green" text @click="createNewIngredient">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog3" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 primary">
          <span>Nuevo Paso</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <br />
        <v-card-text>
          <v-textarea
            v-model.trim="process"
            label="Procedimiento"
            auto-grow
            outlined
            rows="3"
            row-height="25"
            required
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="closeDialogProcess">
            Guardar
          </v-btn>
          <v-btn color="primary" text @click="dialog3 = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" width="900">
      <v-card>
        <v-card-title class="text-h5 orange">
          Registro de Alergias </v-card-title
        ><br />
        <v-card-text>
          <v-col cols="12">
            <v-autocomplete
              v-model="selectedIngredients"
              :items="ingredients"
              filled
              chips
              label="Select"
              item-text="name"
              item-value="id"
              multiple
            >
              <template v-slot:selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  close
                  @click="data.select"
                  @click:close="removee(data.item)"
                >
                  {{ data.item.name }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.name"
                    ></v-list-item-title>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog4 = false"> Cancelar </v-btn>
          <v-btn color="primary" text @click="handleCreateAllergy()">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h5 primary">
          Cantidad
          <v-spacer></v-spacer>
        </v-card-title>
        <br />
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                label="Cantidad"
                outlined
                filled
                v-model="cloneSelectedIngredientsTable.quantity"
              ></v-text-field
            ></v-col>

            <v-col cols="12" md="6">
              <v-autocomplete
                v-model="cloneSelectedIngredientsTable.measure"
                :items="medidas"
                dense
                filled
                label="Medida"
              ></v-autocomplete
            ></v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancelar </v-btn>
          <v-btn color="green" text @click="dialog = false"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="385px">
      <v-card>
        <v-card-title class="text-h5 red">
          Seguro que quieres eliminar el ingrediente de tu receta?
          <v-spacer></v-spacer>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" outlined @click="deleteIngredientOnSelect">
            Confirmar
          </v-btn>
          <v-btn color="green" text @click="dialogDelete = false">
            Cancelar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";
import {
  CreateAllergyInput,
  CreateIngredientInput,
  CreateRecipeInput,
  Ingredient,
  Ingredients,
  Recipe,
  Recipes,
  User,
} from "~/gql/graphql";
import CardRecipes from "~/components/CardRecipes.vue";
const RecipesModule = namespace("RecipesModule");
import { mapState } from "vuex";

const Auth = namespace("AuthModule");
@Component({
  components: { CardRecipes },
  layout(context) {
    return "dashboard";
  },
})
export default class Principal extends Vue {
  remove(item: any) {
    throw new Error("Method not implemented.");
  }
  vText(vText: any) {
    throw new Error("Method not implemented.");
  }
  vHtml(vHtml: any) {
    throw new Error("Method not implemented.");
  }
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
  public dialog = false;
  public dialogDelete = false;
  public dialog2 = false;
  public dialog3 = false;
  public dialog4 = false;
  public dialog5 = false;
  public selectedIngredients: number[] = [];
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
  public medidas = [
    { text: "Kg", value: 1 },
    { text: "Lt", value: 2 },
    { text: "Oz", value: 3 },
    { text: "Lb", value: 4 },
    { text: "Tz", value: 5 },
    { text: "Cda", value: 6 },
    { text: "Cdita", value: 7 },
    { text: "Pza", value: 8 },
  ];
  public value = null;
  public singleSelect = false;
  public selected = [];
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

  public people = [
    { header: "Group 1" },
    { name: "Jitomate" },
    { name: "Cebolla" },
    { name: "Limon" },
    { name: "Ajo" },
  ];
  public dropdown_edit2 = [
    { text: "Desayuno", value: 1 },
    { text: "Comida", value: 2 },
    { text: "Cena", value: 3 },
    { text: "Postre", value: 4 },
  ];
  public AllergyInput2: CreateAllergyInput = {
    allergyTo: [],
  };
  public recipeInput: CreateRecipeInput = {
    description: "",
    nutritionCategory: 0,
    timeCategory: 0,
    title: "",
    amountIngredients: [],
    ingredients: [],
    unitIngredients: [],
    portions: 0,
    process: [],
  };
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

  @RecipesModule.State("recipes")
  private recipes!: Recipe[];
  @RecipesModule.Action
  private fetchRecipes!: () => Promise<void>;
  async created() {
    await this.fetchMe();
  }
  @RecipesModule.Action
  private CreateRecipes!: (data: CreateRecipeInput) => Promise<void>;

  async handleCreateRecipe() {
    console.log(this.recipeInput);

    console.log(this.allProcess);

    const idSelectedIngredients = [];

    for (let i = 0; i < this.selectedIngredientsTable.length; i++) {
      idSelectedIngredients.push(this.selectedIngredientsTable[i].id);
    }

    const quantitySelectedIngredients = [];

    for (let i = 0; i < this.selectedIngredientsTable.length; i++) {
      quantitySelectedIngredients.push(
        this.selectedIngredientsTable[i].quantity
      );
    }

    const measurementsSelectedIngredients = [];

    for (let i = 0; i < this.selectedIngredientsTable.length; i++) {
      measurementsSelectedIngredients.push(
        this.selectedIngredientsTable[i].measure
      );
    }

    const data = {
      title: this.recipeInput.title,
      description: this.recipeInput.description,
      ingredients: idSelectedIngredients,
      amountIngredients: quantitySelectedIngredients,
      unitIngredients: measurementsSelectedIngredients,
      process: this.allProcess,
      timeCategory: this.recipeInput.timeCategory,
      nutritionCategory: this.recipeInput.nutritionCategory,
      portions: this.recipeInput.portions,
    };

    await this.CreateRecipes(data);
    this.dialog2 = false;
  }

  @RecipesModule.Action
  private createAllergy!: (data: CreateAllergyInput) => Promise<void>;
  async handleCreateAllergy() {
    for (let i = 0; i < this.selectedIngredients.length; i++) {
      this.selectedIngredients[i] = Number(this.selectedIngredients[i]);
    }
    await this.createAllergy({
      allergyTo: this.selectedIngredients,
    });
    this.dialog4 = false;
  }
  async removee(item: { id: number; type: number }) {
    console.log(item);

    const index = this.selectedIngredients.indexOf(item.id);
    if (index >= 0) this.selectedIngredients.splice(index, 1);
  }

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

  @Auth.Action
  private logOut!: () => void;
  @RecipesModule.State("snackbarSucessCreateRecipe")
  public snackbarSucessCreateRecipe?: boolean;
  @RecipesModule.State("snackbarSucessMessageCreateRecipe")
  public snackbarSucessMessageCreateRecipe?: string;
  @RecipesModule.Action
  private changeStatusSnackbarCreateRecipe!: () => void;
  @Auth.State("me")
  private me!: User;
  @Auth.Action
  private fetchMe!: () => Promise<void>;
  @RecipesModule.State("ingredients")
  private ingredients!: Ingredient[];
  @RecipesModule.Action
  fetchIngredientes!: () => Promise<void>;

  async mounted() {
    await this.fetchIngredientes();

    console.log(this.ingredients);
  }
}
</script>

<style>
.card_text {
  width: 150px;
  height: 150px;
  border-radius: 80%;
  margin: 30%;
}
</style>
