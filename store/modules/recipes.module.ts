import { isApolloError } from "@apollo/client/errors";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
  CreateRecipeInput,
  Recipe,
  DeleteIngredient,
  Ingredient,
  Recipes,
  User,
  DeleteRecipe,
  CreateAllergyInput,
  AllergyQuery,
  Allergy,
  CreateIngredientInput,
} from "~/gql/graphql";
import recipesService from "~/services/recipes.service";
import RecipesService from "~/services/recipes.service";

@Module({ namespaced: true })
class RecipesModule extends VuexModule {
  public recipes?: Recipe[] = undefined;
  public recipe?: Recipe = undefined;
  public ingredients?: Ingredient[] = undefined;
  public id?: Recipe | undefined = undefined;
  public user: User[] | null = null;
  public loadingAllergyStatus = false;
  public snackbarCreateAllergySuccess = false;
  public snackbarCreateAllergyMessage = "";
  public searchAllergies = "";
  public loadingRecipeStatus = false;
  public loadingRecipesStatus = false;
  public loadingingredientsStatus = false;
  public snackbarSucessCreateRecipe = false;
  public snackbarSucessMessageCreateRecipe = "";
  public loadingdelete = false;
  public successdelete = false;
  public allergyQuery: Allergy[] | null = null;
  public ingredientsTranslated: Ingredient[] | null = null;
  @Mutation
  public setLoadingDelete(status: boolean) {
    this.loadingdelete = status;
  }
  @Mutation
  public setSuccessDelete(status: boolean) {
    this.successdelete = status;
  }

  @Mutation
  public setTranslateIngredients(ingredients: Ingredient[]) {
    this.ingredientsTranslated = ingredients;
  }

  @Action
  async translateIngredients(ids: number[]) {
    return await RecipesService.ingredientsFromList(ids).then((result) => {
      this.context.commit("setTranslateIngredients", result);
    });
  }

  @Action
  async fetchRecipes() {
    this.context.commit("loadingRecipes", true);
    return await RecipesService.getRecipes()
      .then((recipes: Recipe[]) => {
        //console.log(recipes);
        this.context.commit("recipesSuccess", recipes);
        this.context.commit("loadingRecipes", false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Action
  async fetchIngredientes() {
    this.context.commit("loadingingredients", true);
    return await RecipesService.getIngredients()
      .then((ingredients: Ingredient[]) => {
        console.log(ingredients);
        this.context.commit("setIngredients", ingredients);
        this.context.commit("loadingingredients", false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Action
  async createAllergy(data: CreateAllergyInput) {
    this.context.commit("loadingallergy", true);
    try {
      const allergy = await RecipesService.createAllergy(data);
      this.context.commit("allergySuccess", allergy);
      this.context.commit("loadingallergy", false);
      this.context.commit("setsnackbarSucessMessageCreateAllergy");
      this.context.commit("setsnackbarSucessCreateAllergy");
      return allergy;
    } catch (error) {
      console.error(error);
    }
  }
  @Action
  async CreateRecipes(data: CreateRecipeInput) {
    this.context.commit("loadingCreate", true);
    return await RecipesService.createRecipe(data)
      .then((recipes: Recipe) => {
        //console.log(recipes);
        this.context.commit("CreateSuccess", recipes);
        this.context.commit("loadingCreate", false);
        this.context.commit("setsnackbarSucessMessageCreateRecipe");
        this.context.commit("setsnackbarSucessCreateRecipe");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Action
  public changeStatusSnackbarCreateallergy() {
    this.context.commit("setsnackbarSucessCreateallergy");
  }
  @Action
  public changeStatusSnackbarCreateRecipe() {
    this.context.commit("setsnackbarSucessCreateRecipe");
  }

  @Action({ rawError: true })
  async deleteRecipe(recipeId: string): Promise<void> {
    this.context.commit("setLoadingDelete", true);
    this.context.commit("setSuccessDelete", false);
    return await RecipesService.deleteRecipe(recipeId)
      .then((data) => {
        console.log("Llego");
        console.log(data);

        /*  this.context.commit("setDelete", data); */
        this.context.commit("AuthModule/setDeleteRecipe", data, {
          root: true,
        });
        this.context.commit("setLoadingDelete", false);
        this.context.commit("setSuccessDelete", false);
      })
      .catch((error) => {
        this.context.commit("setLoadingDelete", false);
        console.log(error);
        //console.log(JSON.stringify(error, null, 2));
      });
  }

  @Action({ rawError: true })
  async createIngredient(data: CreateIngredientInput): Promise<void> {
    this.context.commit("setLoadingCreate", true);
    return await RecipesService.createIngredient(data)
      .then((data: CreateIngredientInput) => {
        this.context.commit("setIngredient", data);
        /* this.context.commit("setLoadingDelete", false);
        this.context.commit("setSuccessDelete", false); */
      })
      .catch((error) => {
        console.log(error);

        /* this.context.commit("setLoadingDelete", false); */
      });
  }

  @Mutation
  public setIngredient(data: any) {
    if (this.ingredients) {
      console.log("entro ingredient", data);
      const cloneIngredients = [...this.ingredients];
      cloneIngredients.push(data);
      this.ingredients = cloneIngredients;
    }
  }

  @Mutation
  public setsnackbarSucessMessageCreateRecipe() {
    this.snackbarSucessMessageCreateRecipe = "Receta creada correctamente";
  }
  @Mutation
  public setsnackbarSucessCreateRecipe() {
    this.snackbarSucessCreateRecipe = !this.snackbarSucessCreateRecipe;
  }
  @Mutation
  public recipesSuccess(recipes: Recipe[]): void {
    this.recipes = recipes;
  }
  @Mutation
  public loadingRecipes(status: boolean) {
    this.loadingRecipeStatus = status;
  }
  @Mutation
  public CreateSuccess(recipes: Recipe): void {
    if (this.recipes) {
      this.recipes = [recipes, ...this.recipes];
    }
  }
  @Mutation
  public loadingallergy(): boolean {
    return this.loadingAllergyStatus;
  }
  get isLoadingallergy(): boolean {
    return this.loadingAllergyStatus;
  }
  @Mutation
  public allergySuccess(allergy: User): void {
    if (this.user) {
      this.user = [allergy, ...this.user];
    }
  }
  @Mutation
  public loadingCreate(status: boolean) {
    this.loadingRecipeStatus = status;
  }
  get isLoadingCreate(): boolean {
    return this.loadingRecipesStatus;
  }
  get isLoadingRecipes(): boolean {
    return this.loadingRecipesStatus;
  }
  get isLoadingRecipe(): boolean {
    return this.loadingRecipesStatus;
  }
  @Mutation
  public ingredientsSuccess(): void {
    this.ingredientsSuccess != this.ingredientsSuccess;
  }
  @Mutation
  public loadingingredients(status: boolean) {
    this.loadingingredientsStatus = status;
  }
  @Mutation
  setIngredients(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
  }
}
export default RecipesModule;
