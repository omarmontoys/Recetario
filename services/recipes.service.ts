import { apolloClient } from "@/provider/ApolloProvider";
import {
  CreateRecipe,
  CreateRecipeInput,
  Recipe,
  Recipes,
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
}

export default new RecipesService();
