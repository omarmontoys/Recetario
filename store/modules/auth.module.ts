import { ApolloError } from "@apollo/client";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import {
  Auth,
  CreateUserInput,
  Group,
  LoginInput,
  User,
  Users,
  UsersQuery,
} from "~/gql/graphql";
import authService from "~/services/auth.service";

import AuthService from "~/services/auth.service";

@Module({ namespaced: true })
class AuthModule extends VuexModule {
  public me?: User = undefined;
  public users?: UsersQuery[] = undefined;
  public loadingLoginStatus = false;
  public loadingRegisterStatus = false;
  public loadingUsersStatus = false;
  public errorMessage?: string = undefined;

  @Mutation
  public loginFaile(error: any) {
    if (error.message === "Tus datos son incorrectos") {
      this.errorMessage = "Tus datos son incorrectos";
    } else if (error.message === "No Used found") {
      this.errorMessage = "Usuario no encontrado";
    } else if (error.message === "Argument Validation Error") {
      this.errorMessage = "Argumentos Invalidos";
    } else {
      this.errorMessage = "A ocurrido un error";
    }
  }

  @Mutation
  public resetErrorMessage() {
    this.errorMessage = undefined;
  }

  @Mutation
  public removeCookies() {
    window.$nuxt.$cookies.remove("token");
    window.$nuxt.$router.push("/");
  }

  @Action({ rawError: true })
  logOut(): void {
    this.context.commit("removeCookies");
  }
  @Action
  async fetchMe(data: {
    allergy?: number;
    ingredients?: [number];
    rating?: number;
    nutrition?: number;
    time?: number;
  }) {
    this.context.commit("loadingUser", true);
    return await AuthService.currentUser(
      data.allergy,
      data.ingredients,
      data.rating,
      data.nutrition,
      data.time
    )
      .then((user: User) => {
        //console.log(user);
        this.context.commit("userSuccess", user);
        this.context.commit("loadingUser", false);
      })
      .catch((error) => {
        console.log(error.message);
        this.context.commit("loadingUser", false);
      });
  }

  @Mutation
  public CreateSuccess(groups: Group): void {
    if (this.me) {
      const copyUser = { ...this.me };
      copyUser.groups = [...copyUser.groups];
      copyUser.groups.push(groups);
      this.me = copyUser;
    }
  }

  @Mutation
  public groupSuccess(data: Group): void {
    if (this.me) {
      const index = this.me.groups.findIndex((group) => {
        return group.id === data.id;
      });
      if (index !== -1) {
        const copyUser = { ...this.me };
        copyUser.groups = [...copyUser.groups];

        Vue.set(this.me.groups, index, copyUser.groups);
      }
    }
  }

  @Mutation
  public setDeleteRecipe(data: { id: string }) {
    console.log("LLego setDelete");
    if (this.me) {
      const index = this.me.recipes.findIndex((recipe) => {
        return recipe.id === data.id;
      });
      if (index !== -1) {
        const copyUser = { ...this.me };
        copyUser.recipes = [...copyUser.recipes];

        Vue.delete(copyUser.recipes, index);
        this.me = copyUser;
      }
    }

    /*    if (this.recipes) {
      console.log("entro");

      const index = this.recipes?.findIndex((recipe) => {
        return recipe.id === data.id;
      });
      if (index !== -1) {
        const copyTask = [...this.recipes];
        Vue.delete(copyTask, index);
        this.recipes = copyTask;
      }
    } */
  }

  @Action
  async login(data: LoginInput) {
    this.context.commit("loadingLogin", true);
    this.context.commit("resetErrorMessage");
    return await AuthService.login(data)
      .then((auth: Auth) => {
        //console.log(auth);
        this.context.commit("loginSuccess", auth);
        this.context.commit("loadingLogin", false);
        window.$nuxt.$router.push("./PagPrin/Principal");
      })
      .catch((error) => {
        console.log(error.message);
        this.context.commit("loginFaile", error);
        this.context.commit("loadingLogin", false);
      });
  }

  @Action
  async registerUser(data: CreateUserInput) {
    this.context.commit("loadingRegister", true);
    return await AuthService.registerUser(data)
      .then(async () => {
        return await AuthService.login({
          email: data.email,
          password: data.password,
        })
          .then((auth: Auth) => {
            //console.log(auth);
            this.context.commit("loginSuccess", auth);
            this.context.commit("loadingRegister", false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        window.$nuxt.$router.push("/");
      });
  }
  @Mutation
  public userSuccess(user: User): void {
    //console.log(user);
    this.me = user;
  }
  @Mutation
  public loadingUser(status: boolean) {
    this.loadingLoginStatus = status;
  }
  @Mutation
  public loginSuccess(auth: Auth): void {
    // console.log(auth);
    window.$nuxt.$cookies.set("token", auth.token, {
      path: "/",
    });
  }

  @Mutation
  public loadingLogin(status: boolean) {
    this.loadingLoginStatus = status;
  }

  @Mutation
  public loadingRegister(status: boolean) {
    this.loadingRegisterStatus = status;
  }

  get isLoadingLogin(): boolean {
    return this.loadingLoginStatus;
  }

  get isLoadingRegister(): boolean {
    return this.loadingRegisterStatus;
  }
  @Action
  async fetchUsers() {
    this.context.commit("loadingUsers", true);
    return await AuthService.getUsers()
      .then((users: UsersQuery[]) => {
        console.log(users);
        this.context.commit("setUsers", users);
        this.context.commit("loadingUsers", false);
      })
      .catch((error) => {
        console.log(error.message);
        this.context.commit("loadingUsers", false);
      });
  }

  @Mutation
  public usersSuccess(): void {
    this.usersSuccess != this.usersSuccess;
  }
  @Mutation
  public loadingUsers(status: boolean) {
    this.loadingUsersStatus = status;
  }
  @Mutation
  setUsers(users: UsersQuery[]): void {
    this.users = users;
  }
}
export default AuthModule;
