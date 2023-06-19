import { isApolloError } from "@apollo/client/errors";
import Vue from "vue";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { CreateGroupInput, Group, UpdateGroupInput, User } from "~/gql/graphql";
import recipesService from "~/services/recipes.service";
import RecipesService from "~/services/recipes.service";
import GroupsService from "~/services/groups.service";
import authService from "~/services/auth.service";

@Module({ namespaced: true })
class GroupModule extends VuexModule {
  public user: User[] | null = null;
  public loadingGroupStatus = false;
  public groups?: Group[] = undefined;
  public group?: Group = undefined;
  @Action
  async CreateGroup(data: CreateGroupInput) {
    this.context.commit("loadingCreate", true);
    return await GroupsService.createGroup(data)
      .then((data: CreateGroupInput) => {
        /*   this.context.commit("CreateSuccess", data); */
        this.context.commit("AuthModule/CreateSuccess", data, {
          root: true,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }

  @Mutation
  public loadingCreate(status: boolean) {
    this.loadingGroupStatus = status;
  }
  @Action
  async updateGroup(data: UpdateGroupInput) {
    this.context.commit("loadingGroup", true);
    console.log(data);
    try {
      const group = await GroupsService.updateGroup(data);
      console.log(group);
      /*     this.context.commit("groupSuccess", group); */
      this.context.commit("AuthModule/groupSuccess", data, {
        root: true,
      });
      this.context.commit("loadingGroup", false);
    } catch (error) {
      console.error(error);
    }
  }
  @Mutation
  public loadingGroup(): boolean {
    return this.loadingGroupStatus;
  }
  get isLoadingGroup(): boolean {
    return this.loadingGroupStatus;
  }
  @Action
  async fetchGroup(
    /*   data: string, */
    data: {
      id: string;
      allergy?: number;
      ingredients?: [number];
      nutrition?: number;
      time?: number;
    }
  ) {
    this.context.commit("loadingGroup", true);
    return await GroupsService.fetchGroup(
      data.id,
      data.allergy,
      data.ingredients,
      data.nutrition,
      data.time
    )
      .then((group: Group) => {
        //console.log(recipes);
        this.context.commit("groupSuccess", group);
        this.context.commit("loadingGroup", false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  @Mutation
  public groupSuccess(group: Group): void {
    this.group = group;
  }
}
export default GroupModule;
