// @ts-nocheck
import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  EmailAddress: any;
  LocalDate: any;
  LocalTime: any;
  PhoneNumber: any;
  Upload: any;
};

export type AcceptToGroupInput = {
  email: Scalars['String'];
  id: Scalars['String'];
};

export type AcceptToGroupResponse = {
  __typename?: 'AcceptToGroupResponse';
  msg: Scalars['String'];
};

export type Attendance = {
  __typename?: 'Attendance';
  day: Scalars['LocalDate'];
  id: Scalars['String'];
  present: Scalars['Boolean'];
  trainee: Trainee;
};

export type AttendanceByDayInput = {
  day: Scalars['LocalDate'];
};

export type AutoLogInUserInput = {
  userId: Scalars['String'];
};

export type ChangeEmailInput = {
  email: Scalars['EmailAddress'];
  id: Scalars['String'];
};

export type ChangeEmailResponse = {
  __typename?: 'ChangeEmailResponse';
  refreshToken: Scalars['String'];
  user: User;
};

export type ChangePasswordInput = {
  id: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  user: User;
};

export type ChangeProfilePicInput = {
  image: Scalars['Upload'];
  userId: Scalars['String'];
};

export type ChangeProfilePicResponse = {
  __typename?: 'ChangeProfilePicResponse';
  accessToken: Scalars['String'];
  expiresIn: Scalars['String'];
  user: User;
};

export type City = {
  __typename?: 'City';
  citySrc: Scalars['String'];
  coach: Coach;
  id: Scalars['String'];
  mapSrc: Scalars['String'];
  name: Scalars['String'];
  priceListSrc: Scalars['String'];
  room: Scalars['String'];
  roomSrc: Scalars['String'];
};

export type Coach = {
  __typename?: 'Coach';
  city: City;
  facebookUrl: Scalars['String'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['String'];
  instagramUrl: Scalars['String'];
  user: User;
};

export type ConfirmContractReceiptInput = {
  id: Scalars['String'];
};

export type ConfirmContractReceiptResponse = {
  __typename?: 'ConfirmContractReceiptResponse';
  msg: Scalars['String'];
};

export type CreateAttendanceInput = {
  day: Scalars['LocalDate'];
  present: Scalars['Boolean'];
  traineeId: Scalars['String'];
};

export type CreateAttendanceResponse = {
  __typename?: 'CreateAttendanceResponse';
  msg: Scalars['String'];
};

export type CreateChargeInput = {
  amount: Scalars['Float'];
  paymentMethodId: Scalars['String'];
};

export type CreateChargeResponse = {
  __typename?: 'CreateChargeResponse';
  msg: Scalars['String'];
};

export type CreateCityInput = {
  citySrc: Scalars['String'];
  mapSrc: Scalars['String'];
  name: Scalars['String'];
  priceListSrc: Scalars['String'];
  room: Scalars['String'];
  roomSrc: Scalars['String'];
};

export type CreateCoachInput = {
  cityId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateExerciseInput = {
  day: Scalars['LocalDate'];
  end: Scalars['LocalTime'];
  groupId: Scalars['String'];
  start: Scalars['LocalTime'];
};

export type CreateExerciseResponse = {
  __typename?: 'CreateExerciseResponse';
  msg: Scalars['String'];
};

export type CreateGroupInput = {
  coachId: Scalars['String'];
  limit: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type CreateGroupResponse = {
  __typename?: 'CreateGroupResponse';
  msg: Scalars['String'];
};

export type CreateTraineeInput = {
  birthDate: Scalars['LocalDate'];
  feedback: Scalars['String'];
  groupId: Scalars['String'];
  parentEmail: Scalars['EmailAddress'];
  parentPhone: Scalars['PhoneNumber'];
  traineeName: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateTraineeResponse = {
  __typename?: 'CreateTraineeResponse';
  user: User;
};

export type CreateUserInput = {
  email: Scalars['EmailAddress'];
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

export type DeleteTraineeInput = {
  userId: Scalars['String'];
};

export type DeleteTraineeResponse = {
  __typename?: 'DeleteTraineeResponse';
  user?: Maybe<User>;
};

export type EditExerciseInput = {
  day: Scalars['LocalDate'];
  end: Scalars['LocalTime'];
  exerciseId: Scalars['String'];
  start: Scalars['LocalTime'];
};

export type EditExerciseResponse = {
  __typename?: 'EditExerciseResponse';
  msg: Scalars['String'];
};

export type EditGroupInput = {
  groupId: Scalars['String'];
  limit: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
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
  id: Scalars['String'];
  start: Scalars['LocalTime'];
};

export type ForgotPasswordInput = {
  email: Scalars['EmailAddress'];
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  msg: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  coach: Coach;
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['String'];
  limit: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  trainees?: Maybe<Array<Trainee>>;
};

export type JoinGroupInput = {
  id: Scalars['String'];
};

export type JoinGroupResponse = {
  __typename?: 'JoinGroupResponse';
  msg: Scalars['String'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
  refreshToken: Scalars['String'];
  user: User;
};

export type LogInUserInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

export type LogOutResponse = {
  __typename?: 'LogOutResponse';
  msg: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptToGroup: AcceptToGroupResponse;
  autoLogInUser: LogInResponse;
  changeEmail: ChangeEmailResponse;
  changePassword: ChangePasswordResponse;
  changeProfilePic: ChangeProfilePicResponse;
  confirmContractReceipt: ConfirmContractReceiptResponse;
  createAttendance: CreateAttendanceResponse;
  createCharge: CreateChargeResponse;
  createCity: City;
  createCoach: Coach;
  createExercise: CreateExerciseResponse;
  createGroup: CreateGroupResponse;
  createTrainee: CreateTraineeResponse;
  createUser: User;
  deleteCity: City;
  deleteExercise: DeleteExerciseResponse;
  deleteGroup: DeleteGroupResponse;
  deleteTrainee: DeleteTraineeResponse;
  editExercise: EditExerciseResponse;
  editGroup: EditGroupResponse;
  forgotPassword: ForgotPasswordResponse;
  joinGroup: JoinGroupResponse;
  logInUser: LogInResponse;
  logOutUser: LogOutResponse;
  refreshToken: RefreshTokenResponse;
  registerUser: LogInResponse;
  sendEmailToGroup: SendEmailToGroupResponse;
};


export type MutationAcceptToGroupArgs = {
  acceptToGroupInput: AcceptToGroupInput;
};


export type MutationAutoLogInUserArgs = {
  autoLogInUserInput: AutoLogInUserInput;
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


export type MutationConfirmContractReceiptArgs = {
  confirmContractReceiptInput: ConfirmContractReceiptInput;
};


export type MutationCreateAttendanceArgs = {
  createAttendanceInput: CreateAttendanceInput;
};


export type MutationCreateChargeArgs = {
  createChargeInput: CreateChargeInput;
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
  id: Scalars['String'];
};


export type MutationDeleteExerciseArgs = {
  id: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTraineeArgs = {
  deleteTraineeInput: DeleteTraineeInput;
};


export type MutationEditExerciseArgs = {
  editExerciseInput: EditExerciseInput;
};


export type MutationEditGroupArgs = {
  editGroupInput: EditGroupInput;
};


export type MutationForgotPasswordArgs = {
  forgotPasswordInput: ForgotPasswordInput;
};


export type MutationJoinGroupArgs = {
  joinGroupInput: JoinGroupInput;
};


export type MutationLogInUserArgs = {
  logInUserInput: LogInUserInput;
};


export type MutationRefreshTokenArgs = {
  refreshTokenInput: RefreshTokenInput;
};


export type MutationRegisterUserArgs = {
  registerUserInput: RegisterUserInput;
};


export type MutationSendEmailToGroupArgs = {
  sendEmailToGroupInput: SendEmailToGroupInput;
};

export type Query = {
  __typename?: 'Query';
  coaches: Array<Coach>;
  exercises: Array<Exercise>;
  findOne: User;
  getAttendanceByDay: Array<Attendance>;
  getCoach: Coach;
  getTrainee: Trainee;
  groups: Array<Group>;
  trainees: Array<Trainee>;
  users: Array<User>;
};


export type QueryFindOneArgs = {
  email: Scalars['String'];
};


export type QueryGetAttendanceByDayArgs = {
  attendanceByDayInput: AttendanceByDayInput;
};


export type QueryGetCoachArgs = {
  id: Scalars['String'];
};


export type QueryGetTraineeArgs = {
  id: Scalars['String'];
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  accessToken: Scalars['String'];
  expiresIn: Scalars['Float'];
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

export type SendEmailToGroupInput = {
  from: Scalars['EmailAddress'];
  groupId: Scalars['String'];
  message: Scalars['String'];
  sender: Scalars['String'];
  subject: Scalars['String'];
};

export type SendEmailToGroupResponse = {
  __typename?: 'SendEmailToGroupResponse';
  msg: Scalars['String'];
};

/** Trainee status */
export enum Status {
  Accepted = 'ACCEPTED',
  AcceptedWithoutContract = 'ACCEPTED_WITHOUT_CONTRACT',
  Expectation = 'EXPECTATION',
  FirstTime = 'FIRST_TIME'
}

export type Trainee = {
  __typename?: 'Trainee';
  attendances?: Maybe<Array<Attendance>>;
  birthDate: Scalars['LocalDate'];
  feedback: Scalars['String'];
  group: Group;
  id: Scalars['String'];
  parentEmail: Scalars['EmailAddress'];
  parentPhone: Scalars['PhoneNumber'];
  status: Status;
  traineeName: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  imgSrc: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  roles: Array<Role>;
};

export type AutoLogInUserMutationVariables = Exact<{
  input: AutoLogInUserInput;
}>;


export type AutoLogInUserMutation = { __typename?: 'Mutation', autoLogInUser: { __typename?: 'LogInResponse', expiresIn: number, accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', msg: string } };

export type LogInUserMutationVariables = Exact<{
  input: LogInUserInput;
}>;


export type LogInUserMutation = { __typename?: 'Mutation', logInUser: { __typename?: 'LogInResponse', expiresIn: number, accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type LogOutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutUserMutation = { __typename?: 'Mutation', logOutUser: { __typename?: 'LogOutResponse', msg: string } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenInput;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponse', expiresIn: number, accessToken: string } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'LogInResponse', expiresIn: number, accessToken: string, refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type AcceptToGroupMutationVariables = Exact<{
  input: AcceptToGroupInput;
}>;


export type AcceptToGroupMutation = { __typename?: 'Mutation', acceptToGroup: { __typename?: 'AcceptToGroupResponse', msg: string } };

export type ConfirmContractReceiptMutationVariables = Exact<{
  input: ConfirmContractReceiptInput;
}>;


export type ConfirmContractReceiptMutation = { __typename?: 'Mutation', confirmContractReceipt: { __typename?: 'ConfirmContractReceiptResponse', msg: string } };

export type CreateAttendanceMutationVariables = Exact<{
  input: CreateAttendanceInput;
}>;


export type CreateAttendanceMutation = { __typename?: 'Mutation', createAttendance: { __typename?: 'CreateAttendanceResponse', msg: string } };

export type CreateExerciseMutationVariables = Exact<{
  input: CreateExerciseInput;
}>;


export type CreateExerciseMutation = { __typename?: 'Mutation', createExercise: { __typename?: 'CreateExerciseResponse', msg: string } };

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'CreateGroupResponse', msg: string } };

export type DeleteExerciseMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteExerciseMutation = { __typename?: 'Mutation', deleteExercise: { __typename?: 'DeleteExerciseResponse', msg: string } };

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'DeleteGroupResponse', msg: string } };

export type DeleteTraineeMutationVariables = Exact<{
  input: DeleteTraineeInput;
}>;


export type DeleteTraineeMutation = { __typename?: 'Mutation', deleteTrainee: { __typename?: 'DeleteTraineeResponse', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } | null } };

export type EditExerciseMutationVariables = Exact<{
  input: EditExerciseInput;
}>;


export type EditExerciseMutation = { __typename?: 'Mutation', editExercise: { __typename?: 'EditExerciseResponse', msg: string } };

export type EditGroupMutationVariables = Exact<{
  input: EditGroupInput;
}>;


export type EditGroupMutation = { __typename?: 'Mutation', editGroup: { __typename?: 'EditGroupResponse', msg: string } };

export type GetAttendanceByDayQueryVariables = Exact<{
  attendanceByDayInput: AttendanceByDayInput;
}>;


export type GetAttendanceByDayQuery = { __typename?: 'Query', getAttendanceByDay: Array<{ __typename?: 'Attendance', day: any, present: boolean, trainee: { __typename?: 'Trainee', status: Status, user: { __typename?: 'User', firstName: string, lastName: string } } }> };

export type GetCoachQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCoachQuery = { __typename?: 'Query', getCoach: { __typename?: 'Coach', id: string, city: { __typename?: 'City', id: string, name: string }, groups?: Array<{ __typename?: 'Group', id: string, name: string, limit: number, price: number, exercises?: Array<{ __typename?: 'Exercise', id: string, day: any, start: any, end: any }> | null, trainees?: Array<{ __typename?: 'Trainee', id: string, birthDate: any, traineeName: string, parentPhone: any, parentEmail: any, feedback: string, status: Status, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string } }> | null }> | null } };

export type SendEmailToGroupMutationVariables = Exact<{
  input: SendEmailToGroupInput;
}>;


export type SendEmailToGroupMutation = { __typename?: 'Mutation', sendEmailToGroup: { __typename?: 'SendEmailToGroupResponse', msg: string } };

export type CreateTraineeMutationVariables = Exact<{
  input: CreateTraineeInput;
}>;


export type CreateTraineeMutation = { __typename?: 'Mutation', createTrainee: { __typename?: 'CreateTraineeResponse', user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type GetAllCoachesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCoachesQuery = { __typename?: 'Query', coaches: Array<{ __typename?: 'Coach', facebookUrl: string, instagramUrl: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, imgSrc: string }, city: { __typename?: 'City', id: string, name: string, room: string, citySrc: string, roomSrc: string, mapSrc: string, priceListSrc: string }, groups?: Array<{ __typename?: 'Group', id: string, name: string, limit: number, trainees?: Array<{ __typename?: 'Trainee', id: string }> | null }> | null }> };

export type CreateChargeMutationVariables = Exact<{
  input: CreateChargeInput;
}>;


export type CreateChargeMutation = { __typename?: 'Mutation', createCharge: { __typename?: 'CreateChargeResponse', msg: string } };

export type GetTraineeQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTraineeQuery = { __typename?: 'Query', getTrainee: { __typename?: 'Trainee', id: string, status: Status, group: { __typename?: 'Group', id: string, name: string, exercises?: Array<{ __typename?: 'Exercise', id: string, day: any, start: any, end: any }> | null } } };

export type JoinGroupMutationVariables = Exact<{
  input: JoinGroupInput;
}>;


export type JoinGroupMutation = { __typename?: 'Mutation', joinGroup: { __typename?: 'JoinGroupResponse', msg: string } };

export type ChangeEmailMutationVariables = Exact<{
  input: ChangeEmailInput;
}>;


export type ChangeEmailMutation = { __typename?: 'Mutation', changeEmail: { __typename?: 'ChangeEmailResponse', refreshToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type ChangePasswordMutationVariables = Exact<{
  input: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ChangePasswordResponse', user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type ChangeProfilePicMutationVariables = Exact<{
  input: ChangeProfilePicInput;
}>;


export type ChangeProfilePicMutation = { __typename?: 'Mutation', changeProfilePic: { __typename?: 'ChangeProfilePicResponse', user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };


export const AutoLogInUserDocument = `
    mutation AutoLogInUser($input: AutoLogInUserInput!) {
  autoLogInUser(autoLogInUserInput: $input) {
    expiresIn
    accessToken
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
export const useAutoLogInUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AutoLogInUserMutation, TError, AutoLogInUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AutoLogInUserMutation, TError, AutoLogInUserMutationVariables, TContext>(
      ['AutoLogInUser'],
      (variables?: AutoLogInUserMutationVariables) => fetcher<AutoLogInUserMutation, AutoLogInUserMutationVariables>(client, AutoLogInUserDocument, variables, headers)(),
      options
    );
useAutoLogInUserMutation.fetcher = (client: GraphQLClient, variables: AutoLogInUserMutationVariables, headers?: RequestInit['headers']) => fetcher<AutoLogInUserMutation, AutoLogInUserMutationVariables>(client, AutoLogInUserDocument, variables, headers);
export const ForgotPasswordDocument = `
    mutation forgotPassword($input: ForgotPasswordInput!) {
  forgotPassword(forgotPasswordInput: $input) {
    msg
  }
}
    `;
export const useForgotPasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ForgotPasswordMutation, TError, ForgotPasswordMutationVariables, TContext>(
      ['forgotPassword'],
      (variables?: ForgotPasswordMutationVariables) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers)(),
      options
    );
useForgotPasswordMutation.fetcher = (client: GraphQLClient, variables: ForgotPasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ForgotPasswordMutation, ForgotPasswordMutationVariables>(client, ForgotPasswordDocument, variables, headers);
export const LogInUserDocument = `
    mutation LogInUser($input: LogInUserInput!) {
  logInUser(logInUserInput: $input) {
    expiresIn
    accessToken
    refreshToken
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
export const useLogInUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogInUserMutation, TError, LogInUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogInUserMutation, TError, LogInUserMutationVariables, TContext>(
      ['LogInUser'],
      (variables?: LogInUserMutationVariables) => fetcher<LogInUserMutation, LogInUserMutationVariables>(client, LogInUserDocument, variables, headers)(),
      options
    );
useLogInUserMutation.fetcher = (client: GraphQLClient, variables: LogInUserMutationVariables, headers?: RequestInit['headers']) => fetcher<LogInUserMutation, LogInUserMutationVariables>(client, LogInUserDocument, variables, headers);
export const LogOutUserDocument = `
    mutation LogOutUser {
  logOutUser {
    msg
  }
}
    `;
export const useLogOutUserMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<LogOutUserMutation, TError, LogOutUserMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<LogOutUserMutation, TError, LogOutUserMutationVariables, TContext>(
      ['LogOutUser'],
      (variables?: LogOutUserMutationVariables) => fetcher<LogOutUserMutation, LogOutUserMutationVariables>(client, LogOutUserDocument, variables, headers)(),
      options
    );
useLogOutUserMutation.fetcher = (client: GraphQLClient, variables?: LogOutUserMutationVariables, headers?: RequestInit['headers']) => fetcher<LogOutUserMutation, LogOutUserMutationVariables>(client, LogOutUserDocument, variables, headers);
export const RefreshTokenDocument = `
    mutation RefreshToken($input: RefreshTokenInput!) {
  refreshToken(refreshTokenInput: $input) {
    expiresIn
    accessToken
  }
}
    `;
export const useRefreshTokenMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<RefreshTokenMutation, TError, RefreshTokenMutationVariables, TContext>(
      ['RefreshToken'],
      (variables?: RefreshTokenMutationVariables) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(client, RefreshTokenDocument, variables, headers)(),
      options
    );
useRefreshTokenMutation.fetcher = (client: GraphQLClient, variables: RefreshTokenMutationVariables, headers?: RequestInit['headers']) => fetcher<RefreshTokenMutation, RefreshTokenMutationVariables>(client, RefreshTokenDocument, variables, headers);
export const RegisterUserDocument = `
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(registerUserInput: $input) {
    expiresIn
    accessToken
    refreshToken
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
useRegisterUserMutation.fetcher = (client: GraphQLClient, variables: RegisterUserMutationVariables, headers?: RequestInit['headers']) => fetcher<RegisterUserMutation, RegisterUserMutationVariables>(client, RegisterUserDocument, variables, headers);
export const AcceptToGroupDocument = `
    mutation AcceptToGroup($input: AcceptToGroupInput!) {
  acceptToGroup(acceptToGroupInput: $input) {
    msg
  }
}
    `;
export const useAcceptToGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<AcceptToGroupMutation, TError, AcceptToGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<AcceptToGroupMutation, TError, AcceptToGroupMutationVariables, TContext>(
      ['AcceptToGroup'],
      (variables?: AcceptToGroupMutationVariables) => fetcher<AcceptToGroupMutation, AcceptToGroupMutationVariables>(client, AcceptToGroupDocument, variables, headers)(),
      options
    );
useAcceptToGroupMutation.fetcher = (client: GraphQLClient, variables: AcceptToGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<AcceptToGroupMutation, AcceptToGroupMutationVariables>(client, AcceptToGroupDocument, variables, headers);
export const ConfirmContractReceiptDocument = `
    mutation ConfirmContractReceipt($input: ConfirmContractReceiptInput!) {
  confirmContractReceipt(confirmContractReceiptInput: $input) {
    msg
  }
}
    `;
export const useConfirmContractReceiptMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ConfirmContractReceiptMutation, TError, ConfirmContractReceiptMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ConfirmContractReceiptMutation, TError, ConfirmContractReceiptMutationVariables, TContext>(
      ['ConfirmContractReceipt'],
      (variables?: ConfirmContractReceiptMutationVariables) => fetcher<ConfirmContractReceiptMutation, ConfirmContractReceiptMutationVariables>(client, ConfirmContractReceiptDocument, variables, headers)(),
      options
    );
useConfirmContractReceiptMutation.fetcher = (client: GraphQLClient, variables: ConfirmContractReceiptMutationVariables, headers?: RequestInit['headers']) => fetcher<ConfirmContractReceiptMutation, ConfirmContractReceiptMutationVariables>(client, ConfirmContractReceiptDocument, variables, headers);
export const CreateAttendanceDocument = `
    mutation CreateAttendance($input: CreateAttendanceInput!) {
  createAttendance(createAttendanceInput: $input) {
    msg
  }
}
    `;
export const useCreateAttendanceMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateAttendanceMutation, TError, CreateAttendanceMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateAttendanceMutation, TError, CreateAttendanceMutationVariables, TContext>(
      ['CreateAttendance'],
      (variables?: CreateAttendanceMutationVariables) => fetcher<CreateAttendanceMutation, CreateAttendanceMutationVariables>(client, CreateAttendanceDocument, variables, headers)(),
      options
    );
useCreateAttendanceMutation.fetcher = (client: GraphQLClient, variables: CreateAttendanceMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateAttendanceMutation, CreateAttendanceMutationVariables>(client, CreateAttendanceDocument, variables, headers);
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
useCreateExerciseMutation.fetcher = (client: GraphQLClient, variables: CreateExerciseMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateExerciseMutation, CreateExerciseMutationVariables>(client, CreateExerciseDocument, variables, headers);
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
useCreateGroupMutation.fetcher = (client: GraphQLClient, variables: CreateGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateGroupMutation, CreateGroupMutationVariables>(client, CreateGroupDocument, variables, headers);
export const DeleteExerciseDocument = `
    mutation DeleteExercise($id: String!) {
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
useDeleteExerciseMutation.fetcher = (client: GraphQLClient, variables: DeleteExerciseMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteExerciseMutation, DeleteExerciseMutationVariables>(client, DeleteExerciseDocument, variables, headers);
export const DeleteGroupDocument = `
    mutation DeleteGroup($id: String!) {
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
useDeleteGroupMutation.fetcher = (client: GraphQLClient, variables: DeleteGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteGroupMutation, DeleteGroupMutationVariables>(client, DeleteGroupDocument, variables, headers);
export const DeleteTraineeDocument = `
    mutation DeleteTrainee($input: DeleteTraineeInput!) {
  deleteTrainee(deleteTraineeInput: $input) {
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
export const useDeleteTraineeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteTraineeMutation, TError, DeleteTraineeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteTraineeMutation, TError, DeleteTraineeMutationVariables, TContext>(
      ['DeleteTrainee'],
      (variables?: DeleteTraineeMutationVariables) => fetcher<DeleteTraineeMutation, DeleteTraineeMutationVariables>(client, DeleteTraineeDocument, variables, headers)(),
      options
    );
useDeleteTraineeMutation.fetcher = (client: GraphQLClient, variables: DeleteTraineeMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteTraineeMutation, DeleteTraineeMutationVariables>(client, DeleteTraineeDocument, variables, headers);
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
useEditExerciseMutation.fetcher = (client: GraphQLClient, variables: EditExerciseMutationVariables, headers?: RequestInit['headers']) => fetcher<EditExerciseMutation, EditExerciseMutationVariables>(client, EditExerciseDocument, variables, headers);
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
useEditGroupMutation.fetcher = (client: GraphQLClient, variables: EditGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<EditGroupMutation, EditGroupMutationVariables>(client, EditGroupDocument, variables, headers);
export const GetAttendanceByDayDocument = `
    query GetAttendanceByDay($attendanceByDayInput: AttendanceByDayInput!) {
  getAttendanceByDay(attendanceByDayInput: $attendanceByDayInput) {
    day
    present
    trainee {
      status
      user {
        firstName
        lastName
      }
    }
  }
}
    `;
export const useGetAttendanceByDayQuery = <
      TData = GetAttendanceByDayQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAttendanceByDayQueryVariables,
      options?: UseQueryOptions<GetAttendanceByDayQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAttendanceByDayQuery, TError, TData>(
      ['GetAttendanceByDay', variables],
      fetcher<GetAttendanceByDayQuery, GetAttendanceByDayQueryVariables>(client, GetAttendanceByDayDocument, variables, headers),
      options
    );

useGetAttendanceByDayQuery.getKey = (variables: GetAttendanceByDayQueryVariables) => ['GetAttendanceByDay', variables];
;

useGetAttendanceByDayQuery.fetcher = (client: GraphQLClient, variables: GetAttendanceByDayQueryVariables, headers?: RequestInit['headers']) => fetcher<GetAttendanceByDayQuery, GetAttendanceByDayQueryVariables>(client, GetAttendanceByDayDocument, variables, headers);
export const GetCoachDocument = `
    query GetCoach($id: String!) {
  getCoach(id: $id) {
    id
    city {
      id
      name
    }
    groups {
      id
      name
      limit
      price
      exercises {
        id
        day
        start
        end
      }
      trainees {
        id
        birthDate
        traineeName
        parentPhone
        parentEmail
        feedback
        status
        user {
          id
          firstName
          lastName
          email
          imgSrc
        }
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

useGetCoachQuery.getKey = (variables: GetCoachQueryVariables) => ['GetCoach', variables];
;

useGetCoachQuery.fetcher = (client: GraphQLClient, variables: GetCoachQueryVariables, headers?: RequestInit['headers']) => fetcher<GetCoachQuery, GetCoachQueryVariables>(client, GetCoachDocument, variables, headers);
export const SendEmailToGroupDocument = `
    mutation SendEmailToGroup($input: SendEmailToGroupInput!) {
  sendEmailToGroup(sendEmailToGroupInput: $input) {
    msg
  }
}
    `;
export const useSendEmailToGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<SendEmailToGroupMutation, TError, SendEmailToGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<SendEmailToGroupMutation, TError, SendEmailToGroupMutationVariables, TContext>(
      ['SendEmailToGroup'],
      (variables?: SendEmailToGroupMutationVariables) => fetcher<SendEmailToGroupMutation, SendEmailToGroupMutationVariables>(client, SendEmailToGroupDocument, variables, headers)(),
      options
    );
useSendEmailToGroupMutation.fetcher = (client: GraphQLClient, variables: SendEmailToGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<SendEmailToGroupMutation, SendEmailToGroupMutationVariables>(client, SendEmailToGroupDocument, variables, headers);
export const CreateTraineeDocument = `
    mutation CreateTrainee($input: CreateTraineeInput!) {
  createTrainee(createTraineeInput: $input) {
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
useCreateTraineeMutation.fetcher = (client: GraphQLClient, variables: CreateTraineeMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateTraineeMutation, CreateTraineeMutationVariables>(client, CreateTraineeDocument, variables, headers);
export const GetAllCoachesDocument = `
    query GetAllCoaches {
  coaches {
    facebookUrl
    instagramUrl
    user {
      id
      firstName
      lastName
      imgSrc
    }
    city {
      id
      name
      room
      citySrc
      roomSrc
      mapSrc
      priceListSrc
    }
    groups {
      id
      name
      limit
      trainees {
        id
      }
    }
  }
}
    `;
export const useGetAllCoachesQuery = <
      TData = GetAllCoachesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllCoachesQueryVariables,
      options?: UseQueryOptions<GetAllCoachesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllCoachesQuery, TError, TData>(
      variables === undefined ? ['GetAllCoaches'] : ['GetAllCoaches', variables],
      fetcher<GetAllCoachesQuery, GetAllCoachesQueryVariables>(client, GetAllCoachesDocument, variables, headers),
      options
    );

useGetAllCoachesQuery.getKey = (variables?: GetAllCoachesQueryVariables) => variables === undefined ? ['GetAllCoaches'] : ['GetAllCoaches', variables];
;

useGetAllCoachesQuery.fetcher = (client: GraphQLClient, variables?: GetAllCoachesQueryVariables, headers?: RequestInit['headers']) => fetcher<GetAllCoachesQuery, GetAllCoachesQueryVariables>(client, GetAllCoachesDocument, variables, headers);
export const CreateChargeDocument = `
    mutation createCharge($input: CreateChargeInput!) {
  createCharge(createChargeInput: $input) {
    msg
  }
}
    `;
export const useCreateChargeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateChargeMutation, TError, CreateChargeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateChargeMutation, TError, CreateChargeMutationVariables, TContext>(
      ['createCharge'],
      (variables?: CreateChargeMutationVariables) => fetcher<CreateChargeMutation, CreateChargeMutationVariables>(client, CreateChargeDocument, variables, headers)(),
      options
    );
useCreateChargeMutation.fetcher = (client: GraphQLClient, variables: CreateChargeMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateChargeMutation, CreateChargeMutationVariables>(client, CreateChargeDocument, variables, headers);
export const GetTraineeDocument = `
    query GetTrainee($id: String!) {
  getTrainee(id: $id) {
    id
    status
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

useGetTraineeQuery.getKey = (variables: GetTraineeQueryVariables) => ['GetTrainee', variables];
;

useGetTraineeQuery.fetcher = (client: GraphQLClient, variables: GetTraineeQueryVariables, headers?: RequestInit['headers']) => fetcher<GetTraineeQuery, GetTraineeQueryVariables>(client, GetTraineeDocument, variables, headers);
export const JoinGroupDocument = `
    mutation JoinGroup($input: JoinGroupInput!) {
  joinGroup(joinGroupInput: $input) {
    msg
  }
}
    `;
export const useJoinGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<JoinGroupMutation, TError, JoinGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<JoinGroupMutation, TError, JoinGroupMutationVariables, TContext>(
      ['JoinGroup'],
      (variables?: JoinGroupMutationVariables) => fetcher<JoinGroupMutation, JoinGroupMutationVariables>(client, JoinGroupDocument, variables, headers)(),
      options
    );
useJoinGroupMutation.fetcher = (client: GraphQLClient, variables: JoinGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<JoinGroupMutation, JoinGroupMutationVariables>(client, JoinGroupDocument, variables, headers);
export const ChangeEmailDocument = `
    mutation ChangeEmail($input: ChangeEmailInput!) {
  changeEmail(changeEmailInput: $input) {
    refreshToken
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
export const useChangeEmailMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeEmailMutation, TError, ChangeEmailMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeEmailMutation, TError, ChangeEmailMutationVariables, TContext>(
      ['ChangeEmail'],
      (variables?: ChangeEmailMutationVariables) => fetcher<ChangeEmailMutation, ChangeEmailMutationVariables>(client, ChangeEmailDocument, variables, headers)(),
      options
    );
useChangeEmailMutation.fetcher = (client: GraphQLClient, variables: ChangeEmailMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeEmailMutation, ChangeEmailMutationVariables>(client, ChangeEmailDocument, variables, headers);
export const ChangePasswordDocument = `
    mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(changePasswordInput: $input) {
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
export const useChangePasswordMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangePasswordMutation, TError, ChangePasswordMutationVariables, TContext>(
      ['ChangePassword'],
      (variables?: ChangePasswordMutationVariables) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers)(),
      options
    );
useChangePasswordMutation.fetcher = (client: GraphQLClient, variables: ChangePasswordMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangePasswordMutation, ChangePasswordMutationVariables>(client, ChangePasswordDocument, variables, headers);
export const ChangeProfilePicDocument = `
    mutation ChangeProfilePic($input: ChangeProfilePicInput!) {
  changeProfilePic(changeProfilePicInput: $input) {
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
useChangeProfilePicMutation.fetcher = (client: GraphQLClient, variables: ChangeProfilePicMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeProfilePicMutation, ChangeProfilePicMutationVariables>(client, ChangeProfilePicDocument, variables, headers);