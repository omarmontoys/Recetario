<template>
  <v-container>
    <v-row cols="12">
      <v-col cols="12">
        <div class="d-flex justify-center">
          <img src="../../../assets/images/logos/PrincipalLogoSinfondo.png" />
        </div>
        <v-row class="pt-7" v-if="group && group.filterGroupRecipes">
          <v-col
            cols="4"
            v-for="infoGroup in group.filterGroupRecipes"
            :key="group.id"
          >
            <CardRecipes :recipe="infoGroup" />
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
          <v-icon>mdi-text-box-plus-outline</v-icon>
        </v-btn>
      </template>

      <v-snackbar v-model="snackbarSucessCreateRecipe">
        {{ snackbarSucessMessageCreateRecipe }}

        <template v-slot:action="{ attrs }">
          <v-btn color="green" text v-bind="attrs"> Close </v-btn>
        </template>
      </v-snackbar>

      <template>
        <v-btn
          fab
          dark
          small
          color="primary"
          class="ma-4"
          rounded
          @click="dialog4 = !dialog4"
        >
          <v-icon>mdi-account-plus-outline</v-icon>
        </v-btn>
      </template>

      <!-- <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn> -->
    </v-speed-dial>
    <v-dialog v-model="dialog2" width="900">
      <v-card>
        <v-card-title class="text-h5 primary"> Agregar Recetas </v-card-title
        ><br />
        <v-card-text>
          <v-col cols="12" v-if="me && me.recipes">
            <v-autocomplete
              v-model="selectedRecipes"
              :items="me.recipes"
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
                  {{ data.item.title }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.title"
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
          <v-btn color="red" text @click="dialog2 = false"> Cancelar </v-btn>
          <v-btn color="green" text @click="handleUpdateGroup">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog4" width="900">
      <v-card>
        <v-card-title class="text-h5 primary"> Agregar Usuarios </v-card-title
        ><br />
        <v-card-text>
          <v-col cols="12">
            <v-autocomplete
              v-model="selectedUsers"
              :items="users"
              filled
              chips
              label="Select"
              item-text="names"
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
                  {{ data.item.names + " " + data.item.lastNames }}
                </v-chip>
              </template>
              <template v-slot:item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
                <template v-else>
                  <v-list-item-content>
                    <v-list-item-title
                      v-html="data.item.names + ' ' + data.item.lastNames"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                      v-html="data.item.email"
                    ></v-list-item-subtitle>
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
          <v-btn color="primary" text @click="handleUpdateGroup">
            Confirmar
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
  CreateIngredientInput,
  CreateRecipeInput,
  Ingredient,
  Ingredients,
  Recipe,
  Recipes,
  UpdateAllergyInput,
  UpdateGroupInput,
  User,
  Group,
  UsersQuery,
} from "~/gql/graphql";
import CardRecipes from "~/components/CardRecipesGroups.vue";
const RecipesModule = namespace("RecipesModule");
import { mapState } from "vuex";
const GroupModule = namespace("GroupModule");
const Auth = namespace("AuthModule");
const AuthModule = namespace("AuthModule");
@Component({
  components: { CardRecipes },
  layout(context) {
    return "dashboard";
  },
})
export default class GrupoRecetas extends Vue {
  selectedTasks: any;
  task: any;
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
  public selectedRecipes: number[] = [];
  public selectedUsers: number[] = [];

  public value = null;
  public singleSelect = false;
  public selected = [];
  public search = "";
  public inputGroup: UpdateGroupInput = {
    idGroup: this.$route.params.idGroup,
    name: "",
    recipesId: [],
    usersId: [],
  };

  @Watch("selectedRecipes")
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
    await this.fetchMe({});
  }

  @GroupModule.Action
  private updateGroup!: (data: UpdateGroupInput) => Promise<void>;
  async handleUpdateGroup() {
    for (let i = 0; i < this.selectedUsers.length; i++) {
      this.selectedUsers[i] = Number(this.selectedUsers[i]);
    }
    for (let i = 0; i < this.selectedRecipes.length; i++) {
      this.selectedRecipes[i] = Number(this.selectedRecipes[i]);
    }
    await this.updateGroup({
      idGroup: this.$route.params.idGroup,
      usersId: this.selectedUsers,
      recipesId: this.selectedRecipes,
    });
    this.dialog4 = false;
    this.dialog2 = false;
    this.selectedUsers = [];
    this.selectedRecipes = [];
  }
  async removee(item: { id: number; type: number }) {
    console.log(item);

    const index = this.selectedUsers.indexOf(item.id);
    if (index >= 0) this.selectedUsers.splice(index, 1);
  }
  async removeee(item: { id: number; type: number }) {
    console.log(item);

    const index = this.selectedRecipes.indexOf(item.id);
    if (index >= 0) this.selectedRecipes.splice(index, 1);
  }

  openDialog2() {
    this.dialog2 = true;
    this.cloneIngredients = [...this.ingredients];
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
  private fetchMe!: (data: {
    allergy?: number;
    ingredients?: [number];
    rating?: number;
    nutrition?: number;
    time?: number;
  }) => Promise<void>;
  @RecipesModule.State("ingredients")
  private ingredients!: Ingredient[];

  @GroupModule.Action
  private fetchGroup!: (data: {
    id: string;
    allergy?: number;
    ingredients?: [number];
    nutrition?: number;
    time?: number;
  }) => Promise<void>;
  @GroupModule.State("group")
  private group!: Group;
  @AuthModule.Action
  private fetchUsers!: () => Promise<void>;
  async mounted() {
    await this.fetchGroup({ id: this.$route.params.idGroup });
    await this.fetchUsers();
  }
  @AuthModule.State("users")
  private users!: User[];
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
