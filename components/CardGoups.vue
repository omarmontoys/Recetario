<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card color="success" dark>
          <v-card-title class="text-h6"> {{ group.name }} </v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              class="text-overline"
              :to="`/PagPrin/${group.id}/GrupoRecetas`"
            >
              Mas informacion
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import {
  DeleteRecipeMutation,
  Group,
  Ingredient,
  IngredientsFromList,
  Recipe,
} from "~/gql/graphql";
import { Prop } from "vue-property-decorator";

const RecipesModule = namespace("RecipesModule");
@Component
export default class CardGroups extends Vue {
  @Prop({
    required: false,
  })
  public group!: Group;

  /*   async mounted() {
    await this.translateIngredients(this.recipe.ingredients);
  } */
}
</script>
