import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type CreateRecipeMutationVariables = Exact<{
  create: CreateRecipeInput;
}>;


export type CreateRecipeMutation = { __typename?: 'Mutation', createRecipe: { __typename?: 'Recipe', authorId: string, title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, recipes: Array<{ __typename?: 'Recipe', title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number, authorId: string }> } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', token: string, tokenType: string } };

export type RecipeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RecipeQuery = { __typename?: 'Query', recipe: { __typename?: 'Recipe', title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number, authorId: string } };

export type RecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type RecipesQuery = { __typename?: 'Query', recipes: Array<{ __typename?: 'Recipe', title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number, authorId: string }> };

export type RegisterUserMutationVariables = Exact<{
  create: CreateUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, recipes: Array<{ __typename?: 'Recipe', title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number, authorId: string }> } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, names: string, lastNames: string, email: string, recipes: Array<{ __typename?: 'Recipe', title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number, authorId: string }> } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, names: string, lastNames: string, email: string, recipes: Array<{ __typename?: 'Recipe', title: string, description: string, ingredients: string, process: string, timeCategory: number, nutritionCategory: number, portions: number, authorId: string }> }> };


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
export const Users = gql`
    query Users {
  users {
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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/**  Resultado de autorizacion del usuario */
export type Auth = {
  __typename?: 'Auth';
  /** Identificador del token */
  token: Scalars['String'];
  /** Tipo del token */
  tokenType: Scalars['String'];
};

/** Entradas para el registro de una receta. */
export type CreateRecipeInput = {
  /** Descripción de la receta. */
  description: Scalars['String'];
  /** Ingredientes de la receta. */
  ingredients: Scalars['String'];
  /** Categoría de platillo según la alimentación. */
  nutritionCategory: Scalars['Float'];
  /** Número de porciones que genera la reseta.. */
  portions: Scalars['Float'];
  /** Proceso de la receta. */
  process: Scalars['String'];
  /** Categoría de platillo según el tiempo. */
  timeCategory: Scalars['Float'];
  /** Título de la receta. */
  title: Scalars['String'];
};

/** Entradas para el registro de un usuario. */
export type CreateUserInput = {
  /** Correo electrónico del usuario. */
  email: Scalars['String'];
  /** Apellido(s) del usuario. */
  lastNames: Scalars['String'];
  /** Nombre(s) del usuario. */
  names: Scalars['String'];
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password: Scalars['String'];
};

/** Entradas para la autenticación de un usuario. */
export type LoginInput = {
  /** Correo electrónico del usuario. */
  email: Scalars['String'];
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Mutación para crear una receta. */
  createRecipe: Recipe;
  /** Mutación para elminar un usuario */
  deleteUser: User;
  /** Mutación de login. */
  login: Auth;
  /** Mutación para crear un nuevo ususario. */
  registerUser: User;
  /** Mutación para actualizar un usuario */
  updateUser: User;
};


export type MutationCreateRecipeArgs = {
  create: CreateRecipeInput;
};


export type MutationDeleteUserArgs = {
  delete: Scalars['ID'];
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
  __typename?: 'Query';
  currentUser: User;
  /** Query para ver tarea. */
  recipe: Recipe;
  /** Query para ver tareas. */
  recipes: Array<Recipe>;
  user: User;
  users: Array<User>;
};


export type QueryRecipeArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** Campos de una receta. */
export type Recipe = {
  __typename?: 'Recipe';
  /** Id del autor de la tarea. */
  authorId: Scalars['ID'];
  /** Descripción de la receta. */
  description: Scalars['String'];
  /** Ingredientes de la receta. */
  ingredients: Scalars['String'];
  /** Categoría de platillo según la alimentación. */
  nutritionCategory: Scalars['Int'];
  /** Número de porciones que genera la reseta.. */
  portions: Scalars['Float'];
  /** Proceso de la receta. */
  process: Scalars['String'];
  /** Categoría de platillo según el tiempo. */
  timeCategory: Scalars['Int'];
  /** Título de la receta. */
  title: Scalars['String'];
};

/** Entradas para el registro de un usuario. */
export type UpdateUserInput = {
  /** Correo electrónico del usuario. */
  email?: InputMaybe<Scalars['String']>;
  /** Apellido(s) del usuario. */
  lastNames?: InputMaybe<Scalars['String']>;
  /** Nombre(s) del usuario. */
  names?: InputMaybe<Scalars['String']>;
  /** Contraseña del usuario, se necesitan minimo 6 caracteres, 1 mayuscula y 1 número. */
  password?: InputMaybe<Scalars['String']>;
};

/** Credenciales del usuario. */
export type User = {
  __typename?: 'User';
  /** Email del usuario. */
  email: Scalars['String'];
  /** Id del usuario. */
  id: Scalars['ID'];
  /** Apellidos del usuario. */
  lastNames: Scalars['String'];
  /** Nombre del usuario. */
  names: Scalars['String'];
  /** FieldResolver para mostrar las recetas de un usuario. */
  recipes: Array<Recipe>;
};
