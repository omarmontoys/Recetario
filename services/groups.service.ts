import { apolloClient } from "@/provider/apolloprovider";
import {
  CreateGroup,
  CreateGroupInput,
  Group,
  UpdateGroup,
  UpdateGroupInput,
} from "~/gql/graphql";

class GroupService {
  async createGroup(data: CreateGroupInput) {
    return (
      await apolloClient.mutate({
        mutation: CreateGroup,
        fetchPolicy: "network-only",
        variables: {
          create: data,
        },
      })
    ).data.createGroup;
  }
  async updateGroup(data: UpdateGroupInput) {
    return (
      await apolloClient.mutate({
        mutation: UpdateGroup,
        fetchPolicy: "network-only",
        variables: {
          update: data,
        },
      })
    ).data.updateGroup;
  }
  async fetchGroup(data: string) {
    return (
      await apolloClient.query({
        query: Group,
        fetchPolicy: "network-only",
        variables: {
          id: data,
        },
      })
    ).data.group;
  }
}
export default new GroupService();
