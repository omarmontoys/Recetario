import { apolloClient } from "@/provider/apolloprovider";
import {
  CreateIngredient,
  CreateIngredientInput,
  CreateRecipe,
  CreateRecipeInput,
  DeleteRecipe,
  Ingredients,
  IngredientsFromList,
  Recipe,
  Recipes,
  UpdateAllergyInput,
  UpdateAllergyUser,
  UpdateReviewRecipe,
  UpdateReviewRecipeInput,
  User,
} from "~/gql/graphql";

class RecipesService {
  async getRecipes() {
    return (
      await apolloClient.query({
        query: Recipes,
        fetchPolicy: "network-only",
      })
    ).data.recipes;
  }
  async getReview() {
    return (
      await apolloClient.query({
        query: Recipe,
        fetchPolicy: "network-only",
      })
    ).data.reviews;
  }
  async getIngredients() {
    return (
      await apolloClient.query({
        query: Ingredients,
        fetchPolicy: "network-only",
      })
    ).data.ingredients;
  }
  async getRecipe(id: string) {
    return (
      await apolloClient.query({
        query: Recipe,
        fetchPolicy: "network-only",
        variables: {
          id,
        },
      })
    ).data;
  }
  async deleteRecipe(recipeId: string): Promise<Recipe> {
    console.log("mutacion " + recipeId);
    return (
      await apolloClient.mutate({
        mutation: DeleteRecipe,
        variables: {
          id: recipeId,
        },
      })
    ).data?.deleteRecipe;
  }
  async createRecipe(data: CreateRecipeInput) {
    return (
      await apolloClient.mutate({
        mutation: CreateRecipe,
        fetchPolicy: "network-only",
        variables: {
          create: data,
        },
      })
    ).data.createRecipe;
  }
  async updateAllergy(data: UpdateAllergyInput) {
    return (
      await apolloClient.mutate({
        mutation: UpdateAllergyUser,
        fetchPolicy: "network-only",
        variables: {
          update: data,
        },
      })
    ).data.UpdateAllergyUser;
  }
  async updateReview(data: UpdateReviewRecipeInput) {
    return (
      await apolloClient.mutate({
        mutation: UpdateReviewRecipe,
        fetchPolicy: "network-only",
        variables: {
          update: data,
        },
      })
    ).data.updateReviewRecipe;
  }

  async createIngredient(data: CreateIngredientInput) {
    return (
      await apolloClient.mutate({
        mutation: CreateIngredient,
        fetchPolicy: "network-only",
        variables: {
          create: data,
        },
      })
    ).data.createIngredient;
  }

  async ingredientsFromList(ids: number[]) {
    return (
      await apolloClient.mutate({
        mutation: IngredientsFromList,
        fetchPolicy: "network-only",
        variables: {
          ids,
        },
      })
    ).data.ingredientsFromList;
  }
}

export default new RecipesService();
