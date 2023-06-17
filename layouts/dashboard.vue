<template>
  <v-app>
    <template>
      <v-app-bar color="primary" dark app>
        <nuxt-link to="/PagPrin/Principal">
          <v-toolbar-title class="font-weight-medium">
            Recetario
          </v-toolbar-title>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog1 = !dialog1">
          Filtro
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="50"
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account-group</v-icon>
            </v-btn>
          </template>

          <v-card class="mx-auto" width="350">
            <v-list>
              <v-list-item>
                <v-tabs fixed-tabsx centered grow>
                  <v-tab> Grupos </v-tab>
                </v-tabs>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <div v-if="me && me.groups" class="card-content">
              <CardGroups
                v-for="group in me.groups"
                :key="group.id"
                :group="group"
              />
            </div>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialog2 = !dialog2">
                Crear
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <v-btn icon @click="logOut()">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
    </template>
    <v-dialog v-model="dialog1" width="1000">
      <v-card>
        <v-card-title class="text-h5 primary" dark>
          Filtro
          <v-spacer></v-spacer>
          <div>
            <v-btn class="ma-2" color="black" icon @click="dialog1 = false">
              <v-icon> mdi-close-octagon-outline </v-icon>
            </v-btn>
          </div> </v-card-title
        ><br />

        <v-card-text>
          <v-container fluid>
            <v-row justify="space-between">
              <v-col cols="12" md="4"
                ><h2>Rating</h2>
                <v-radio-group v-model="column" column>
                  <div class="d-flex align-center">
                    <v-radio value="rating1"></v-radio
                    ><v-rating
                      readonly
                      value="1"
                      color="orange"
                      background-color="orange"
                    ></v-rating>
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="rating2"></v-radio
                    ><v-rating
                      readonly
                      value="2"
                      color="orange"
                      background-color="orange"
                    ></v-rating>
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="rating3"></v-radio
                    ><v-rating
                      readonly
                      value="3"
                      color="orange"
                      background-color="orange"
                    ></v-rating>
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="rating4"></v-radio
                    ><v-rating
                      readonly
                      value="4"
                      color="orange"
                      background-color="orange"
                    ></v-rating>
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="rating5"></v-radio
                    ><v-rating
                      readonly
                      value="5"
                      color="orange"
                      background-color="orange"
                    ></v-rating>
                  </div> </v-radio-group
              ></v-col>
              <v-col cols="12" md="6" class="align-center">
                <h2>Alergias</h2>
                <v-radio-group v-model="column" column>
                  <div class="d-flex align-center">
                    <v-radio value="Alergias"></v-radio>Alergias
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="SinAlergias"></v-radio>Sin Alergias
                  </div></v-radio-group
                >
                <v-divider></v-divider>
                <br />
                <h2>Tipos de comida</h2>
                <v-radio-group v-model="column" column>
                  <div class="d-flex align-center">
                    <v-radio value="Vegetariana"></v-radio>Vegetariana
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="Vegana"></v-radio>Vegana
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="Omnívora"></v-radio>Omnívora
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="TodoComida"></v-radio>Todo
                  </div></v-radio-group
                >
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <br />
            <v-row justify="space-between">
              <v-col cols="12" md="4" class="align-center">
                <h2>Posicion en el menu</h2>
                <v-radio-group v-model="column" column>
                  <div class="d-flex align-center">
                    <v-radio value="Desayuno"></v-radio>Desayuno
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="Comida"></v-radio>Comida
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="Cena"></v-radio>Cena
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="Postre"></v-radio>Postre
                  </div>
                  <div class="d-flex align-center">
                    <v-radio value="TodoMenu"></v-radio>Todo
                  </div></v-radio-group
                >
              </v-col>
              <v-col cols="12" md="6">
                <h2>Ingredientes que desea llevar</h2>
                <br />
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
                      <v-list-item-content
                        v-text="data.item"
                      ></v-list-item-content>
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
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog1 = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog1 = false">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" width="1000">
      <v-card>
        <v-card-title class="text-h5 primary" white>
          Crear grupo
          <v-spacer></v-spacer>
          <div>
            <v-btn class="ma-2" color="black" icon @click="dialog2 = false">
              <v-icon> mdi-close-octagon-outline </v-icon>
            </v-btn>
          </div> </v-card-title
        ><br />

        <v-card-text>
          <v-container fluid>
            <v-row> </v-row>
            <br />
            <v-row justify="space-between">
              <v-col>
                <h2>Nombre del Grupo</h2>
                <br />
                <v-text-field
                  label="Titulo"
                  outlined
                  v-model="nameGroup"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog2 = false">
            Cancelar
          </v-btn>
          <v-btn color="green darken-1" text @click="handleCreateGroup">
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import { CreateGroupInput, Ingredient, User } from "~/gql/graphql";
const RecipesModule = namespace("RecipesModule");
const Auth = namespace("AuthModule");
const GroupModule = namespace("GroupModule");
import CardGroups from "~/components/CardGoups.vue";

import { mapState } from "vuex";

@Component({
  components: { CardGroups },
})
export default class Dashboard extends Vue {
  public nameGroup = "";
  public drawer = false;
  public dialog1 = false;
  public dialog2 = false;
  public group = false;
  public column = null;
  public selectedIngredients: number[] = [];
  public fav = true;
  public menu = false;
  public message = false;
  public hints = true;
  @GroupModule.Action
  private CreateGroup!: (data: CreateGroupInput) => Promise<void>;

  @Auth.Action
  private logOut!: () => void;
  @RecipesModule.State("ingredients")
  private ingredients!: Ingredient[];
  @RecipesModule.Action
  fetchIngredientes!: () => Promise<void>;
  @Auth.Action
  private fetchMe!: () => Promise<void>;
  @Auth.State("me")
  private me!: User;
  async mounted() {
    await this.fetchIngredientes();
    await this.fetchMe();
    console.log(this.ingredients);
  }
  async removee(item: { id: number; type: number }) {
    console.log(item);

    const index = this.selectedIngredients.indexOf(item.id);
    if (index >= 0) this.selectedIngredients.splice(index, 1);
  }

  async handleCreateGroup() {
    await this.CreateGroup({
      name: this.nameGroup,
    });
    this.dialog2 = false;
    this.nameGroup = "";
  }
}
</script>

<style>
a {
  color: white !important;
  text-decoration: none !important;
}

.card-content {
  max-height: 350px;
  overflow-y: auto;
}
</style>
