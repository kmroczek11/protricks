import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** A local date string (i.e., with no associated timezone) in `YYYY-MM-DD` format, e.g. `2020-01-01`. */
  LocalDate: any;
  /** A local time string (i.e., with no associated timezone) in 24-hr `HH:mm[:ss[.SSS]]` format, e.g. `14:25` or `14:25:06` or `14:25:06.123`. */
  LocalTime: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** File upload scalar type */
  Upload: any;
};

export type ChangeEmailInput = {
  email: Scalars['String'];
  id: Scalars['Int'];
};

export type ChangeEmailResponse = {
  __typename?: 'ChangeEmailResponse';
  msg: Scalars['String'];
};

export type ChangePasswordInput = {
  id: Scalars['Int'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  msg: Scalars['String'];
};

export type ChangeProfilePicInput = {
  image: Scalars['Upload'];
  userId: Scalars['Int'];
};

export type ChangeProfilePicResponse = {
  __typename?: 'ChangeProfilePicResponse';
  token: Scalars['String'];
  user: User;
};

export type City = {
  __typename?: 'City';
  citySrc: Scalars['String'];
  coach: Coach;
  id: Scalars['Int'];
  name: Scalars['String'];
  room: Scalars['String'];
  roomSrc: Scalars['String'];
};

export type Coach = {
  __typename?: 'Coach';
  groups?: Maybe<Array<Group>>;
  id: Scalars['Int'];
  user: User;
};

export type CreateCityInput = {
  citySrc: Scalars['String'];
  coachId: Scalars['Int'];
  name: Scalars['String'];
  room: Scalars['String'];
  roomSrc: Scalars['String'];
};

export type CreateCoachInput = {
  userId: Scalars['Int'];
};

export type CreateExerciseInput = {
  day: Scalars['LocalDate'];
  end: Scalars['LocalTime'];
  groupId: Scalars['Int'];
  start: Scalars['LocalTime'];
};

export type CreateExerciseResponse = {
  __typename?: 'CreateExerciseResponse';
  msg: Scalars['String'];
};

export type CreateGroupInput = {
  coachId: Scalars['Int'];
  limit: Scalars['Int'];
  name: Scalars['String'];
};

export type CreateGroupResponse = {
  __typename?: 'CreateGroupResponse';
  msg: Scalars['String'];
};

export type CreateTraineeInput = {
  age: Scalars['Int'];
  feedback: Scalars['String'];
  groupId: Scalars['Int'];
  parentEmail: Scalars['EmailAddress'];
  parentName: Scalars['String'];
  parentPhone: Scalars['PhoneNumber'];
  userId: Scalars['Int'];
};

export type CreateTraineeResponse = {
  __typename?: 'CreateTraineeResponse';
  token: Scalars['String'];
  user: User;
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
};

export type DeleteExerciseResponse = {
  __typename?: 'DeleteExerciseResponse';
  msg: Scalars['String'];
};

export type DeleteGroupResponse = {
  __typename?: 'DeleteGroupResponse';
  msg: Scalars['String'];
};

export type EditExerciseInput = {
  day: Scalars['LocalDate'];
  end: Scalars['LocalTime'];
  exerciseId: Scalars['Int'];
  start: Scalars['LocalTime'];
};

export type EditExerciseResponse = {
  __typename?: 'EditExerciseResponse';
  msg: Scalars['String'];
};

export type EditGroupInput = {
  groupId: Scalars['Int'];
  limit: Scalars['Int'];
  name: Scalars['String'];
};

export type EditGroupResponse = {
  __typename?: 'EditGroupResponse';
  msg: Scalars['String'];
};

export type Exercise = {
  __typename?: 'Exercise';
  day: Scalars['LocalDate'];
  end: Scalars['LocalTime'];
  group: Group;
  id: Scalars['Int'];
  start: Scalars['LocalTime'];
};

export type Group = {
  __typename?: 'Group';
  coach: Coach;
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['Int'];
  limit: Scalars['Int'];
  name: Scalars['String'];
  trainees?: Maybe<Array<Trainee>>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  user: User;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail: ChangeEmailResponse;
  changePassword: ChangePasswordResponse;
  changeProfilePic: ChangeProfilePicResponse;
  createCity: City;
  createCoach: Coach;
  createExercise: CreateExerciseResponse;
  createGroup: CreateGroupResponse;
  createTrainee: CreateTraineeResponse;
  createUser: User;
  deleteCity: City;
  deleteExercise: DeleteExerciseResponse;
  deleteGroup: DeleteGroupResponse;
  editExercise: EditExerciseResponse;
  editGroup: EditGroupResponse;
  loginUser: LoginResponse;
  registerUser: RegisterResponse;
};


export type MutationChangeEmailArgs = {
  changeEmailInput: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationChangeProfilePicArgs = {
  changeProfilePicInput: ChangeProfilePicInput;
};


export type MutationCreateCityArgs = {
  createCityInput: CreateCityInput;
};


export type MutationCreateCoachArgs = {
  createCoachInput: CreateCoachInput;
};


export type MutationCreateExerciseArgs = {
  createExerciseInput: CreateExerciseInput;
};


export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput;
};


export type MutationCreateTraineeArgs = {
  createTraineeInput: CreateTraineeInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteCityArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['Int'];
};


export type MutationEditExerciseArgs = {
  editExerciseInput: EditExerciseInput;
};


export type MutationEditGroupArgs = {
  editGroupInput: EditGroupInput;
};


export type MutationLoginUserArgs = {
  loginUserInput: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  exercises: Array<Exercise>;
  findOne: User;
  getCoach: Coach;
  getJwtUser: User;
  getTrainee: Trainee;
  groups: Array<Group>;
  trainees: Array<Trainee>;
  users: Array<User>;
};


export type QueryFindOneArgs = {
  email: Scalars['String'];
};


export type QueryGetCoachArgs = {
  id: Scalars['Int'];
};


export type QueryGetJwtUserArgs = {
  jwt: Scalars['String'];
};


export type QueryGetTraineeArgs = {
  id: Scalars['Int'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  token: Scalars['String'];
  user: User;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  roles?: InputMaybe<Array<Role>>;
};

/** User role */
export enum Role {
  Admin = 'ADMIN',
  Coach = 'COACH',
  Trainee = 'TRAINEE',
  User = 'USER'
}

export type Trainee = {
  __typename?: 'Trainee';
  age: Scalars['Int'];
  feedback: Scalars['String'];
  group: Group;
  id: Scalars['Int'];
  parentEmail: Scalars['EmailAddress'];
  parentName: Scalars['String'];
  parentPhone: Scalars['PhoneNumber'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  imgSrc: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Role>;
};

export type ChangeProfilePicMutationVariables = Exact<{
  input: ChangeProfilePicInput;
}>;


export type ChangeProfilePicMutation = { __typename?: 'Mutation', changeProfilePic: { __typename?: 'ChangeProfilePicResponse', token: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type CreateExerciseMutationVariables = Exact<{
  input: CreateExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'CreateExerciseResponse', msg: string } };

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'CreateGroupResponse', msg: string } };

export type CreateTraineeMutationVariables = Exact<{
  input: CreateTraineeInput;
}>;


export type CreateTraineeMutation = { __typename?: 'Mutation', createTrainee: { __typename?: 'CreateTraineeResponse', token: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: { __typename?: 'DeleteExerciseResponse', msg: string } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'DeleteGroupResponse', msg: string } };

export type EditExerciseMutationVariables = Exact<{
  input: EditExerciseInput;
}>;


export type EditExerciseMutation = { __typename?: 'Mutation', editExercise: { __typename?: 'EditExerciseResponse', msg: string } };

export type EditGroupMutationVariables = Exact<{
  input: EditGroupInput;
}>;


export type EditGroupMutation = { __typename?: 'Mutation', editGroup: { __typename?: 'EditGroupResponse', msg: string } };

export type GetAllCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: number, name: string, room: string, citySrc: string, roomSrc: string, coach: { __typename?: 'Coach', user: { __typename?: 'User', id: number, firstName: string, lastName: string, imgSrc: string }, groups?: Array<{ __typename?: 'Group', id: number, name: string }> | null } }> };

export type GetCoachQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetCoachQuery = { __typename?: 'Query', getCoach: { __typename?: 'Coach', id: number, groups?: Array<{ __typename?: 'Group', id: number, name: string, limit: number, exercises?: Array<{ __typename?: 'Exercise', id: number, day: any, start: any, end: any }> | null }> | null } };

export type GetJwtUserQueryVariables = Exact<{
  input: Scalars['String'];
}>;


export type GetJwtUserQuery = { __typename?: 'Query', getJwtUser: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, roles: Array<Role> } };

export type GetTraineeQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type GetTraineeQuery = { __typename?: 'Query', getTrainee: { __typename?: 'Trainee', id: number, group: { __typename?: 'Group', id: number, name: string, exercises?: Array<{ __typename?: 'Exercise', id: number, day: any, start: any, end: any }> | null } } };

export type LoginUserMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'LoginResponse', token: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'RegisterResponse', token: string, user: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };


export const ChangeProfilePicDocument = `
    mutation ChangeProfilePic($input: ChangeProfilePicInput!) {
  changeProfilePic(changeProfilePicInput: $input) {
    token
    user {
      id
      firstName
      lastName
      email
      imgSrc
      roles
    }
  }
}
    `;
export const useChangeProfilePicMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeProfilePicMutation, TError, ChangeProfilePicMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeProfilePicMutation, TError, ChangeProfilePicMutationVariables, TContext>(
      ['ChangeProfilePic'],
      (variables?: ChangeProfilePicMutationVariables) => fetcher<ChangeProfilePicMutation, ChangeProfilePicMutationVariables>(client, ChangeProfilePicDocument, variables, headers)(),
      options
    );
export const CreateExerciseDocument = `
    mutation CreateExercise($input: CreateExerciseInput!) {
  createExercise(createExerciseInput: $input) {
    msg
  }
}
    `;
export const useCreateExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateExerciseMutation, TError, CreateExerciseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateExerciseMutation, TError, CreateExerciseMutationVariables, TContext>(
      ['CreateExercise'],
      (variables?: CreateExerciseMutationVariables) => fetcher<CreateExerciseMutation, CreateExerciseMutationVariables>(client, CreateExerciseDocument, variables, headers)(),
      options
    );
export const CreateGroupDocument = `
    mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(createGroupInput: $input) {
    msg
  }
}
    `;
export const useCreateGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateGroupMutation, TError, CreateGroupMutationVariables, TContext>(
      ['CreateGroup'],
      (variables?: CreateGroupMutationVariables) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(client, CreateGroupDocument, variables, headers)(),
      options
    );
export const CreateTraineeDocument = `
    mutation CreateTrainee($input: CreateTraineeInput!) {
  createTrainee(createTraineeInput: $input) {
    token
    user {
      id
      firstName
      lastName
      email
      imgSrc
      roles
    }
  }
}
    `;
export const useCreateTraineeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateTraineeMutation, TError, CreateTraineeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateTraineeMutation, TError, CreateTraineeMutationVariables, TContext>(
      ['CreateTrainee'],
      (variables?: CreateTraineeMutationVariables) => fetcher<CreateTraineeMutation, CreateTraineeMutationVariables>(client, CreateTraineeDocument, variables, headers)(),
      options
    );
export const DeleteExerciseDocument = `
    mutation DeleteExercise($id: Int!) {
  deleteExercise(id: $id) {
    msg
  }
}
    `;
export const useDeleteExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteExerciseMutation, TError, DeleteExerciseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteExerciseMutation, TError, DeleteExerciseMutationVariables, TContext>(
      ['DeleteExercise'],
      (variables?: DeleteExerciseMutationVariables) => fetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(client, DeleteExerciseDocument, variables, headers)(),
      options
    );
export const DeleteGroupDocument = `
    mutation DeleteGroup($id: Int!) {
  deleteGroup(id: $id) {
    msg
  }
}
    `;
export const useDeleteGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteGroupMutation, TError, DeleteGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteGroupMutation, TError, DeleteGroupMutationVariables, TContext>(
      ['DeleteGroup'],
      (variables?: DeleteGroupMutationVariables) => fetcher<DeleteGroupMutation, DeleteGroupMutationVariables>(client, DeleteGroupDocument, variables, headers)(),
      options
    );
export const EditExerciseDocument = `
    mutation EditExercise($input: EditExerciseInput!) {
  editExercise(editExerciseInput: $input) {
    msg
  }
}
    `;
export const useEditExerciseMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditExerciseMutation, TError, EditExerciseMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditExerciseMutation, TError, EditExerciseMutationVariables, TContext>(
      ['EditExercise'],
      (variables?: EditExerciseMutationVariables) => fetcher<EditExerciseMutation, EditExerciseMutationVariables>(client, EditExerciseDocument, variables, headers)(),
      options
    );
export const EditGroupDocument = `
    mutation EditGroup($input: EditGroupInput!) {
  editGroup(editGroupInput: $input) {
    msg
  }
}
    `;
export const useEditGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<EditGroupMutation, TError, EditGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<EditGroupMutation, TError, EditGroupMutationVariables, TContext>(
      ['EditGroup'],
      (variables?: EditGroupMutationVariables) => fetcher<EditGroupMutation, EditGroupMutationVariables>(client, EditGroupDocument, variables, headers)(),
      options
    );
export const GetAllCitiesDocument = `
    query GetAllCities {
  cities {
    id
    name
    room
    citySrc
    roomSrc
    coach {
      user {
        id
        firstName
        lastName
        imgSrc
      }
      groups {
        id
        name
      }
    }
  }
}
    `;
export const useGetAllCitiesQuery = <
      TData = GetAllCitiesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllCitiesQueryVariables,
      options?: UseQueryOptions<GetAllCitiesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllCitiesQuery, TError, TData>(
      variables === undefined ? ['GetAllCities'] : ['GetAllCities', variables],
      fetcher<GetAllCitiesQuery, GetAllCitiesQueryVariables>(client, GetAllCitiesDocument, variables, headers),
      options
    );
export const GetCoachDocument = `
    query GetCoach($id: Int!) {
  getCoach(id: $id) {
    id
    groups {
      id
      name
      limit
      exercises {
        id
        day
        start
        end
      }
    }
  }
}
    `;
export const useGetCoachQuery = <
      TData = GetCoachQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetCoachQueryVariables,
      options?: UseQueryOptions<GetCoachQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetCoachQuery, TError, TData>(
      ['GetCoach', variables],
      fetcher<GetCoachQuery, GetCoachQueryVariables>(client, GetCoachDocument, variables, headers),
      options
    );
export const GetJwtUserDocument = `
    query GetJwtUser($input: String!) {
  getJwtUser(jwt: $input) {
    id
    firstName
    lastName
    email
    roles
  }
}
    `;
export const useGetJwtUserQuery = <
      TData = GetJwtUserQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetJwtUserQueryVariables,
      options?: UseQueryOptions<GetJwtUserQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetJwtUserQuery, TError, TData>(
      ['GetJwtUser', variables],
      fetcher<GetJwtUserQuery, GetJwtUserQueryVariables>(client, GetJwtUserDocument, variables, headers),
      options
    );
export const GetTraineeDocument = `
    query GetTrainee($id: Int!) {
  getTrainee(id: $id) {
    id
    group {
      id
      name
      exercises {
        id
        day
        start
        end
      }
    }
  }
}
    `;
export const useGetTraineeQuery = <
      TData = GetTraineeQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetTraineeQueryVariables,
      options?: UseQueryOptions<GetTraineeQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetTraineeQuery, TError, TData>(
      ['GetTrainee', variables],
      fetcher<GetTraineeQuery, GetTraineeQueryVariables>(client, GetTraineeDocument, variables, headers),
      options
    );
export const LoginUserDocument = `
    mutation LoginUser($input: LoginUserInput!) {
  loginUser(loginUserInput: $input) {
    token
    user {
      id
      firstName
      lastName
      email
      imgSrc
      roles
    }
  }
}
    `;
export const useLoginUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LoginUserMutation, TError, LoginUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
      ['LoginUser'],
      (variables?: LoginUserMutationVariables) => fetcher<LoginUserMutation, LoginUserMutationVariables>(client, LoginUserDocument, variables, headers)(),
      options
    );
export const RegisterUserDocument = `
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(registerUserInput: $input) {
    token
    user {
      id
      firstName
      lastName
      email
      imgSrc
      roles
    }
  }
}
    `;
export const useRegisterUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RegisterUserMutation, TError, RegisterUserMutationVariables, TContext>(
      ['RegisterUser'],
      (variables?: RegisterUserMutationVariables) => fetcher<RegisterUserMutation, RegisterUserMutationVariables>(client, RegisterUserDocument, variables, headers)(),
      options
    );