<template>
  <v-app>
    <template>
      <v-app-bar color="primary" dark app>
        <v-app-bar-nav-icon @click="drawer = !drawer"
          ><v-icon>mdi-filter-variant</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title>Recetario</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="logOut()">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="primary--text text--accent-4"
          >
            <v-list-item-title
              style="text-align: center"
              class="font-weight-black"
              >Ratings</v-list-item-title
            >
            <v-list-item>
              <v-list-item-icon>
                <v-rating
                  :value="1"
                  size="18"
                  color="orange"
                  background-color="orange"
                  class="mr-2"
                  readonly
                ></v-rating>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-rating
                  :value="2"
                  size="18"
                  color="orange"
                  background-color="orange"
                  class="mr-2"
                  readonly
                ></v-rating>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-rating
                  :value="3"
                  size="18"
                  color="orange"
                  background-color="orange"
                  class="mr-2"
                  readonly
                ></v-rating>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-rating
                  :value="4"
                  size="18"
                  color="orange"
                  background-color="orange"
                  class="mr-2"
                  readonly
                ></v-rating>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-rating
                  :value="5"
                  size="18"
                  color="orange"
                  background-color="orange"
                  class="mr-2"
                  readonly
                ></v-rating>
              </v-list-item-icon>
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
    </template>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { CreateRecipeInput, LoginInput, Recipe, User } from "~/gql/graphql";

const Auth = namespace("AuthModule");
@Component
export default class Dashboard extends Vue {
  public drawer = false;
  public dialog2 = false;
  public group = false;

  @Auth.Action
  private logOut!: () => void;
}
</script>
