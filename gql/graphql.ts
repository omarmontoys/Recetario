import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type AllergiesQueryVariables = Exact<{ [key: string]: never }>;

export type AllergiesQuery = {
  __typename?: "Query";
  allergies: Array<{
    __typename?: "Allergy";
    allergyTo: Array<number>;
    userId: string;
  }>;
};

export type AllergyQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type AllergyQuery = {
  __typename?: "Query";
  allergy: { __typename?: "Allergy"; allergyTo: Array<number>; userId: string };
};

export type CreateAllergyMutationVariables = Exact<{
  create: CreateAllergyInput;
}>;

export type CreateAllergyMutation = {
  __typename?: "Mutation";
  createAllergy: {
    __typename?: "Allergy";
    allergyTo: Array<number>;
    userId: string;
  };
};

export type CreateIngredientMutationVariables = Exact<{
  create: CreateIngredientInput;
}>;

export type CreateIngredientMutation = {
  __typename?: "Mutation";
  createIngredient: { __typename?: "Ingredient"; name: string; type: number };
};

export type CreateRecipeMutationVariables = Exact<{
  create: CreateRecipeInput;
}>;

export type CreateRecipeMutation = {
  __typename?: "Mutation";
  createRecipe: {
    __typename?: "Recipe";
    authorId: string;
    title: string;
    description: string;
    ingredients: Array<number>;
    process: Array<string>;
    timeCategory: number;
    nutritionCategory: number;
    portions: number;
  };
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: "Query";
  currentUser: {
    __typename?: "User";
    id: string;
    names: string;
    lastNames: string;
    email: string;
    recipes: Array<{
      __typename?: "Recipe";
      id: string;
      title: string;
      description: string;
      ingredients: Array<number>;
      process: Array<string>;
      timeCategory: number;
      nutritionCategory: number;
      portions: number;
      authorId: string;
    }>;
    allergies: Array<{
      __typename?: "Allergy";
      allergyTo: Array<number>;
      userId: string;
    }>;
  };
};

export type DeleteAllergyMutationVariables = Exact<{
  delete: Scalars["ID"];
}>;

export type DeleteAllergyMutation = {
  __typename?: "Mutation";
  deleteAllergy: {
    __typename?: "Allergy";
    allergyTo: Array<number>;
    userId: string;
  };
};

export type DeleteIngredientMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteIngredientMutation = {
  __typename?: "Mutation";
  deleteIngredient: { __typename?: "Ingredient"; name: string; type: number };
};

export type DeleteRecipeMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteRecipeMutation = {
  __typename?: "Mutation";
  deleteRecipe: {
    __typename?: "Recipe";
    id: string;
    title: string;
    description: string;
    ingredients: Array<number>;
    amountIngredients: Array<number>;
    unitIngredients: Array<number>;
    process: Array<string>;
    timeCategory: number;
    nutritionCategory: number;
    portions: number;
    authorId: string;
  };
};

export type IngredientQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type IngredientQuery = {
  __typename?: "Query";
  ingredient: {
    __typename?: "Ingredient";
    name: string;
    type: number;
    id: string;
  };
};

export type IngredientsQueryVariables = Exact<{ [key: string]: never }>;

export type IngredientsQuery = {
  __typename?: "Query";
  ingredients: Array<{
    __typename?: "Ingredient";
    name: string;
    type: number;
    id: string;
  }>;
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: { __typename?: "Auth"; token: string; tokenType: string };
};

export type RecipeQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type RecipeQuery = {
  __typename?: "Query";
  recipe: {
    __typename?: "Recipe";
    id: string;
    title: string;
    description: string;
    ingredients: Array<number>;
    process: Array<string>;
    timeCategory: number;
    nutritionCategory: number;
    portions: number;
    authorId: string;
  };
};

export type RecipesQueryVariables = Exact<{ [key: string]: never }>;

export type RecipesQuery = {
  __typename?: "Query";
  recipes: Array<{
    __typename?: "Recipe";
    id: string;
    title: string;
    description: string;
    ingredients: Array<number>;
    process: Array<string>;
    timeCategory: number;
    nutritionCategory: number;
    portions: number;
    authorId: string;
  }>;
};

export type RegisterUserMutationVariables = Exact<{
  create: CreateUserInput;
}>;

export type RegisterUserMutation = {
  __typename?: "Mutation";
  registerUser: {
    __typename?: "User";
    id: string;
    names: string;
    lastNames: string;
    email: string;
    recipes: Array<{
      __typename?: "Recipe";
      title: string;
      description: string;
      ingredients: Array<number>;
      process: Array<string>;
      timeCategory: number;
      nutritionCategory: number;
      portions: number;
      authorId: string;
    }>;
  };
};

export type UserQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type UserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: string;
    names: string;
    lastNames: string;
    email: string;
    recipes: Array<{
      __typename?: "Recipe";
      id: string;
      title: string;
      description: string;
      ingredients: Array<number>;
      process: Array<string>;
      timeCategory: number;
      nutritionCategory: number;
      portions: number;
      authorId: string;
    }>;
    allergies: Array<{
      __typename?: "Allergy";
      allergyTo: Array<number>;
      userId: string;
    }>;
  };
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users: Array<{
    __typename?: "User";
    id: string;
    names: string;
    lastNames: string;
    email: string;
    recipes: Array<{
      __typename?: "Recipe";
      id: string;
      title: string;
      description: string;
      ingredients: Array<number>;
      process: Array<string>;
      timeCategory: number;
      nutritionCategory: number;
      portions: number;
      authorId: string;
    }>;
  }>;
};

export const Allergies = gql`
  query Allergies {
    allergies {
      allergyTo
      userId
    }
  }
`;
export const Allergy = gql`
  query Allergy($id: ID!) {
    allergy(id: $id) {
      allergyTo
      userId
    }
  }
`;
export const CreateAllergy = gql`
  mutation CreateAllergy($create: CreateAllergyInput!) {
    createAllergy(create: $create) {
      allergyTo
      userId
    }
  }
`;
export const CreateIngredient = gql`
  mutation CreateIngredient($create: CreateIngredientInput!) {
    createIngredient(create: $create) {
      name
      type
    }
  }
`;
export const CreateRecipe = gql`
  mutation CreateRecipe($create: CreateRecipeInput!) {
    createRecipe(create: $create) {
      authorId
      title
      description
      ingredients
      process
      timeCategory
      nutritionCategory
      portions
      authorId
    }
  }
`;
export const CurrentUser = gql`
  query CurrentUser {
    currentUser {
      id
      names
      lastNames
      email
      recipes {
        id
        title
        description
        ingredients
        process
        timeCategory
        nutritionCategory
        portions
        authorId
      }
      allergies {
        allergyTo
        userId
      }
    }
  }
`;
export const DeleteAllergy = gql`
  mutation DeleteAllergy($delete: ID!) {
    deleteAllergy(delete: $delete) {
      allergyTo
      userId
    }
  }
`;
export const DeleteIngredient = gql`
  mutation DeleteIngredient($id: ID!) {
    deleteIngredient(delete: $id) {
      name
      type
    }
  }
`;
export const DeleteRecipe = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(delete: $id) {
      id
      title
      description
      ingredients
      amountIngredients
      unitIngredients
      process
      timeCategory
      nutritionCategory
      portions
      authorId
    }
  }
`;
export const Ingredient = gql`
  query Ingredient($id: ID!) {
    ingredient(id: $id) {
      name
      type
      id
    }
  }
`;
export const Ingredients = gql`
  query Ingredients {
    ingredients {
      name
      type
      id
    }
  }
`;
export const Login = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      tokenType
    }
  }
`;
export const Recipe = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      ingredients
      process
      timeCategory
      nutritionCategory
      portions
      authorId
    }
  }
`;
export const Recipes = gql`
  query Recipes {
    recipes {
      id
      title
      description
      ingredients
      process
      timeCategory
      nutritionCategory
      portions
      authorId
    }
  }
`;
export const RegisterUser = gql`
  mutation RegisterUser($create: CreateUserInput!) {
    registerUser(create: $create) {
      id
      names
      lastNames
      email
      recipes {
        title
        description
        ingredients
        process
        timeCategory
        nutritionCategory
        portions
        authorId
      }
    }
  }
`;
export const User = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      names
      lastNames
      email
      recipes {
        id
        title
        description
        ingredients
        process
        timeCategory
        nutritionCategory
        portions
        authorId
      }
      allergies {
        allergyTo
        userId
      }
    }
  }
`;
export const Users = gql`
  query Users {
    users {
      id
      names
      lastNames
      email
      recipes {
        id
        title
        description
        ingredients
        process
        timeCategory
        nutritionCategory
        portions
        authorId
      }
    }
  }
`;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

/** Campos de una alergia. */
export type Allergy = {
  __typename?: "Allergy";
  /** Ingredientes a los que es alergico. */
  allergyTo: Array<Scalars["Int"]>;
  /** Id del user alergico. */
  userId: Scalars["ID"];
};

/**  Resultado de autorizacion del usuario */
export type Auth = {
  __typename?: "Auth";
  /** Identificador del token */
  token: Scalars["String"];
  /** Tipo del token */
  tokenType: Scalars["String"];
};

/** Entradas para el registro de una alergia. */
export type CreateAllergyInput = {
  /** Ingredientes de la receta. */
  allergyTo: Array<Scalars["Int"]>;
};

/** Entradas para el registro de un ingrediente. */
export type CreateIngredientInput = {
  /** Nombre del ingrediente. */
  name: Scalars["String"];
  /** Tipo de ingrediente, 1 es sólido y 2 líquido. */
  type: Scalars["Int"];
};

/** Entradas para el registro de una receta. */
export type CreateRecipeInput = {
  /** Cantidad de ingredientes de la receta. */
  amountIngredients: Array<Scalars["Int"]>;
  /** Descripción de la receta. */
  description: Scalars["String"];
  /** Ingredientes de la receta. */
  ingredients: Array<Scalars["Int"]>;
  /** Categoría de platillo según la alimentación. */
  nutritionCategory: Scalars["Int"];
  /** Número de porciones que genera la reseta.. */
  portions: Scalars["Int"];
  /** Proceso de la receta. */
  process: Array<Scalars["String"]>;
  /** Categoría de platillo según el tiempo. */
  timeCategory: Scalars["Int"];
  /** Título de la receta. */
  title: Scalars["String"];
  /** Unidad de medida de ingredientes de la receta. */
  unitIngredients: Array<Scalars["Int"]>;
};

/** Entradas para el registro de una reseña. */
export type CreateReviewInput = {
  /** Descripción de la reseña. */
  description?: InputMaybe<Scalars["String"]>;
  /** Valor de la reseña de una receta. */
  rating: Scalars["Int"];
  /** Id de la receta. */
  recipeId: Scalars["ID"];
  /** Título de la reseña. */
  title: Scalars["String"];
};

/** Entradas para el registro de un usuario. */
export type CreateUserInput = {
  /** Correo electrónico del usuario. */
  email: Scalars["String"];
  /** Apellido(s) del usuario. */
  lastNames: Scalars["String"];
  /** Nombre(s) del usuario. */
  names: Scalars["String"];
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password: Scalars["String"];
};

/** Campos de un ingrediente. */
export type Ingredient = {
  __typename?: "Ingredient";
  /** Id del ingrediente. */
  id: Scalars["ID"];
  /** Nombre del ingrediente. */
  name: Scalars["String"];
  /** Tipo de ingrediente 1 es sólido y 2 líquido. */
  type: Scalars["Int"];
};

/** Entradas para la autenticación de un usuario. */
export type LoginInput = {
  /** Correo electrónico del usuario. */
  email: Scalars["String"];
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  /** Mutación para crear una alergia. */
  createAllergy: Allergy;
  /** Mutación para crear un nuevo ingrediente. */
  createIngredient: Ingredient;
  /** Mutación para crear una receta. */
  createRecipe: Recipe;
  /** Mutación para crear una reseña. */
  createReview: Review;
  /** Mutación para eliminar una alergia. */
  deleteAllergy: Allergy;
  /** Mutación para eliminar un ingrediente. */
  deleteIngredient: Ingredient;
  /** Mutación para eliminar una receta. */
  deleteRecipe: Recipe;
  /** Mutación para elminar un usuario */
  deleteUser: User;
  /** Mutación de login. */
  login: Auth;
  /** Mutación para crear un nuevo ususario. */
  registerUser: User;
  /** Mutación para actualizar un usuario */
  updateUser: User;
};

export type MutationCreateAllergyArgs = {
  create: CreateAllergyInput;
};

export type MutationCreateIngredientArgs = {
  create: CreateIngredientInput;
};

export type MutationCreateRecipeArgs = {
  create: CreateRecipeInput;
};

export type MutationCreateReviewArgs = {
  create: CreateReviewInput;
};

export type MutationDeleteAllergyArgs = {
  delete: Scalars["ID"];
};

export type MutationDeleteIngredientArgs = {
  delete: Scalars["ID"];
};

export type MutationDeleteRecipeArgs = {
  delete: Scalars["ID"];
};

export type MutationDeleteUserArgs = {
  delete: Scalars["ID"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationRegisterUserArgs = {
  create: CreateUserInput;
};

export type MutationUpdateUserArgs = {
  update: UpdateUserInput;
};

export type Query = {
  __typename?: "Query";
  /** Query para ver todas las alergias. */
  allergies: Array<Allergy>;
  /** Query para ver una alergia. */
  allergy: Allergy;
  currentUser: User;
  /** Query para ver un ingrediente en especifico. */
  ingredient: Ingredient;
  /** Query para ver todos los ingredientes. */
  ingredients: Array<Ingredient>;
  /** Query para obtener ingredientes de una lista de ids. */
  ingredientsFromList: Array<Ingredient>;
  /** Query para ver tarea. */
  recipe: Recipe;
  /** Query para ver tareas. */
  recipes: Array<Recipe>;
  user: User;
  users: Array<User>;
};

export type QueryAllergyArgs = {
  id: Scalars["ID"];
};

export type QueryIngredientArgs = {
  id: Scalars["ID"];
};

export type QueryIngredientsFromListArgs = {
  ids: Array<Scalars["ID"]>;
};

export type QueryRecipeArgs = {
  id: Scalars["ID"];
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

/** Campos de una receta. */
export type Recipe = {
  __typename?: "Recipe";
  /** Ingredientes de la receta. */
  amountIngredients: Array<Scalars["Int"]>;
  /** Id del autor de la tarea. */
  authorId: Scalars["ID"];
  /** Descripción de la receta. */
  description: Scalars["String"];
  /** Id de la receta. */
  id: Scalars["ID"];
  /** Ingredientes de la receta. */
  ingredients: Array<Scalars["Int"]>;
  /** Categoría de platillo según la alimentación. */
  nutritionCategory: Scalars["Int"];
  /** Número de porciones que genera la reseta.. */
  portions: Scalars["Float"];
  /** Proceso de la receta. */
  process: Array<Scalars["String"]>;
  /** Field resolver para obtener las reviews de una receta. */
  reviews: Array<Review>;
  /** Categoría de platillo según el tiempo. */
  timeCategory: Scalars["Int"];
  /** Título de la receta. */
  title: Scalars["String"];
  /** Ingredientes de la receta. */
  unitIngredients: Array<Scalars["Int"]>;
};

/** Campos de una reseña. */
export type Review = {
  __typename?: "Review";
  /** Id del autor de la reseña. */
  authorId: Scalars["ID"];
  /** Fecha de creación de la review. */
  cratedAt: Scalars["DateTime"];
  /** Descripción de la reseña. */
  description?: Maybe<Scalars["String"]>;
  /** Id de la review. */
  id: Scalars["ID"];
  /** Valor de la reseña de una receta. */
  rating: Scalars["Int"];
  /** Id de la receta de la reseña. */
  recipeId: Scalars["ID"];
  /** Título de la reseña. */
  title: Scalars["String"];
};

/** Entradas para el registro de un usuario. */
export type UpdateUserInput = {
  /** Correo electrónico del usuario. */
  email?: InputMaybe<Scalars["String"]>;
  /** Apellido(s) del usuario. */
  lastNames?: InputMaybe<Scalars["String"]>;
  /** Nombre(s) del usuario. */
  names?: InputMaybe<Scalars["String"]>;
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password?: InputMaybe<Scalars["String"]>;
};

/** Credenciales del usuario. */
export type User = {
  __typename?: "User";
  /** FieldResolver para mostrar las alergias de un usuario. */
  allergies: Array<Allergy>;
  /** Email del usuario. */
  email: Scalars["String"];
  /** Id del usuario. */
  id: Scalars["ID"];
  /** Apellidos del usuario. */
  lastNames: Scalars["String"];
  /** Nombre del usuario. */
  names: Scalars["String"];
  /** FieldResolver para mostrar las recetas de un usuario. */
  recipes: Array<Recipe>;
};
