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
  traineeId: Scalars['String'];
  userId: Scalars['String'];
};

export type AcceptToGroupResponse = {
  __typename?: 'AcceptToGroupResponse';
  msg: Scalars['String'];
};

export type Attendance = {
  __typename?: 'Attendance';
  day: Scalars['LocalDate'];
  group: Group;
  id: Scalars['String'];
  present: Scalars['Boolean'];
  status: Scalars['String'];
  trainee: Trainee;
};

export type AttendanceByGroupIdAndDayInput = {
  day: Scalars['LocalDate'];
  groupId: Scalars['String'];
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

export type ChangeGroupInput = {
  groupId: Scalars['String'];
  traineeId: Scalars['String'];
};

export type ChangeGroupResponse = {
  __typename?: 'ChangeGroupResponse';
  msg: Scalars['String'];
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
  email: Scalars['String'];
  traineeId: Scalars['String'];
};

export type ConfirmContractReceiptResponse = {
  __typename?: 'ConfirmContractReceiptResponse';
  msg: Scalars['String'];
};

export type CreateAttendanceInput = {
  day: Scalars['LocalDate'];
  groupId: Scalars['String'];
  present: Scalars['Boolean'];
  status: Scalars['String'];
  traineeId: Scalars['String'];
};

export type CreateAttendanceResponse = {
  __typename?: 'CreateAttendanceResponse';
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

export type CreateLostTraineeInput = {
  traineeId: Scalars['String'];
};

export type CreateLostTraineeResponse = {
  __typename?: 'CreateLostTraineeResponse';
  msg: Scalars['String'];
};

export type CreatePaymentIntentInput = {
  amount: Scalars['Float'];
};

export type CreatePaymentIntentResponse = {
  __typename?: 'CreatePaymentIntentResponse';
  clientSecret: Scalars['String'];
};

export type CreatePaymentItemInput = {
  amount: Scalars['Float'];
  month: Scalars['String'];
};

export type CreatePaymentItemResponse = {
  __typename?: 'CreatePaymentItemResponse';
  msg: Scalars['String'];
};

export type CreateTraineeInput = {
  birthDate: Scalars['LocalDate'];
  dateJoined: Scalars['LocalDate'];
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

export type DeleteTraineeWithMessageInput = {
  email: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteTraineeWithMessageResponse = {
  __typename?: 'DeleteTraineeWithMessageResponse';
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

export type GetMonthlyExercisesInput = {
  userId: Scalars['String'];
};

export type GetMonthlyExercisesResponse = {
  __typename?: 'GetMonthlyExercisesResponse';
  monthObjects: Array<MonthObject>;
  price: Scalars['Float'];
};

export type Group = {
  __typename?: 'Group';
  attendances?: Maybe<Array<Attendance>>;
  coach: Coach;
  exercises?: Maybe<Array<Exercise>>;
  id: Scalars['String'];
  limit: Scalars['Int'];
  name: Scalars['String'];
  price: Scalars['Float'];
  trainees?: Maybe<Array<Trainee>>;
};

export type JoinGroupInput = {
  email: Scalars['String'];
  traineeId: Scalars['String'];
  userId: Scalars['String'];
};

export type JoinGroupResponse = {
  __typename?: 'JoinGroupResponse';
  msg: Scalars['String'];
};

export type LogInResponse = {
  __typename?: 'LogInResponse';
  accessToken: Scalars['String'];
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

export type MonthObject = {
  __typename?: 'MonthObject';
  exercises: Array<Exercise>;
  month: Scalars['String'];
  payed: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptToGroup: AcceptToGroupResponse;
  autoLogInUser: LogInResponse;
  changeEmail: ChangeEmailResponse;
  changeGroup: ChangeGroupResponse;
  changePassword: ChangePasswordResponse;
  changeProfilePic: ChangeProfilePicResponse;
  confirmContractReceipt: ConfirmContractReceiptResponse;
  createAttendance: CreateAttendanceResponse;
  createCity: City;
  createCoach: Coach;
  createExercise: CreateExerciseResponse;
  createGroup: CreateGroupResponse;
  createLostTrainee: CreateLostTraineeResponse;
  createPaymentIntent: CreatePaymentIntentResponse;
  createPaymentItem: CreatePaymentItemResponse;
  createTrainee: CreateTraineeResponse;
  createUser: User;
  deleteCity: City;
  deleteExercise: DeleteExerciseResponse;
  deleteGroup: DeleteGroupResponse;
  deleteTrainee: DeleteTraineeResponse;
  deleteTraineeWithMessage: DeleteTraineeWithMessageResponse;
  editExercise: EditExerciseResponse;
  editGroup: EditGroupResponse;
  forgotPassword: ForgotPasswordResponse;
  joinGroup: JoinGroupResponse;
  logInUser: LogInResponse;
  logOutUser: LogOutResponse;
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


export type MutationChangeGroupArgs = {
  changeGroupInput: ChangeGroupInput;
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


export type MutationCreateLostTraineeArgs = {
  createLostTraineeInput: CreateLostTraineeInput;
};


export type MutationCreatePaymentIntentArgs = {
  createPaymentIntentInput: CreatePaymentIntentInput;
};


export type MutationCreatePaymentItemArgs = {
  createPaymentItemInput: CreatePaymentItemInput;
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


export type MutationDeleteTraineeWithMessageArgs = {
  deleteTraineeWithMessageInput: DeleteTraineeWithMessageInput;
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
  getAttendanceByGroupIdAndDay: Array<Attendance>;
  getAttendanceByUserId: Array<Attendance>;
  getCoach: Coach;
  getMonthlyExercises: GetMonthlyExercisesResponse;
  getTrainee: Trainee;
  groups: Array<Group>;
  trainees: Array<Trainee>;
  users: Array<User>;
};


export type QueryFindOneArgs = {
  email: Scalars['String'];
};


export type QueryGetAttendanceByGroupIdAndDayArgs = {
  attendanceByGroupIdAndDayInput: AttendanceByGroupIdAndDayInput;
};


export type QueryGetAttendanceByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryGetCoachArgs = {
  id: Scalars['String'];
};


export type QueryGetMonthlyExercisesArgs = {
  getMonthlyExercisesInput: GetMonthlyExercisesInput;
};


export type QueryGetTraineeArgs = {
  id: Scalars['String'];
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
  dateJoined: Scalars['LocalDate'];
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


export type AutoLogInUserMutation = { __typename?: 'Mutation', autoLogInUser: { __typename?: 'LogInResponse', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type LogInUserMutationVariables = Exact<{
  input: LogInUserInput;
}>;


export type LogInUserMutation = { __typename?: 'Mutation', logInUser: { __typename?: 'LogInResponse', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type LogOutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutUserMutation = { __typename?: 'Mutation', logOutUser: { __typename?: 'LogOutResponse', msg: string } };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'LogInResponse', accessToken: string, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } } };

export type ForgotPasswordMutationVariables = Exact<{
  input: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: { __typename?: 'ForgotPasswordResponse', msg: string } };

export type AcceptToGroupMutationVariables = Exact<{
  input: AcceptToGroupInput;
}>;


export type AcceptToGroupMutation = { __typename?: 'Mutation', acceptToGroup: { __typename?: 'AcceptToGroupResponse', msg: string } };

export type ChangeGroupMutationVariables = Exact<{
  input: ChangeGroupInput;
}>;


export type ChangeGroupMutation = { __typename?: 'Mutation', changeGroup: { __typename?: 'ChangeGroupResponse', msg: string } };

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

export type GetAttendanceByGroupIdAndDayQueryVariables = Exact<{
  attendanceByGroupIdAndDayInput: AttendanceByGroupIdAndDayInput;
}>;


export type GetAttendanceByGroupIdAndDayQuery = { __typename?: 'Query', getAttendanceByGroupIdAndDay: Array<{ __typename?: 'Attendance', day: any, present: boolean, status: string, trainee: { __typename?: 'Trainee', status: Status, user: { __typename?: 'User', firstName: string, lastName: string } } }> };

export type GetCoachQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCoachQuery = { __typename?: 'Query', getCoach: { __typename?: 'Coach', id: string, city: { __typename?: 'City', id: string, name: string }, groups?: Array<{ __typename?: 'Group', id: string, name: string, limit: number, price: number, exercises?: Array<{ __typename?: 'Exercise', id: string, day: any, start: any, end: any }> | null, trainees?: Array<{ __typename?: 'Trainee', id: string, birthDate: any, traineeName: string, parentPhone: any, parentEmail: any, feedback: string, status: Status, dateJoined: any, user: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string } }> | null }> | null } };

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

export type CreateLostTraineeMutationVariables = Exact<{
  input: CreateLostTraineeInput;
}>;


export type CreateLostTraineeMutation = { __typename?: 'Mutation', createLostTrainee: { __typename?: 'CreateLostTraineeResponse', msg: string } };

export type CreatePaymentIntentMutationVariables = Exact<{
  input: CreatePaymentIntentInput;
}>;


export type CreatePaymentIntentMutation = { __typename?: 'Mutation', createPaymentIntent: { __typename?: 'CreatePaymentIntentResponse', clientSecret: string } };

export type CreatePaymentItemMutationVariables = Exact<{
  input: CreatePaymentItemInput;
}>;


export type CreatePaymentItemMutation = { __typename?: 'Mutation', createPaymentItem: { __typename?: 'CreatePaymentItemResponse', msg: string } };

export type DeleteTraineeWithMessageMutationVariables = Exact<{
  input: DeleteTraineeWithMessageInput;
}>;


export type DeleteTraineeWithMessageMutation = { __typename?: 'Mutation', deleteTraineeWithMessage: { __typename?: 'DeleteTraineeWithMessageResponse', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, imgSrc: string, roles: Array<Role> } | null } };

export type GetAttendanceByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetAttendanceByUserIdQuery = { __typename?: 'Query', getAttendanceByUserId: Array<{ __typename?: 'Attendance', day: any, present: boolean }> };

export type GetMonthlyExercisesQueryVariables = Exact<{
  input: GetMonthlyExercisesInput;
}>;


export type GetMonthlyExercisesQuery = { __typename?: 'Query', getMonthlyExercises: { __typename?: 'GetMonthlyExercisesResponse', price: number, monthObjects: Array<{ __typename?: 'MonthObject', month: string, payed: boolean, exercises: Array<{ __typename?: 'Exercise', id: string, day: any }> }> } };

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
export const LogInUserDocument = `
    mutation LogInUser($input: LogInUserInput!) {
  logInUser(logInUserInput: $input) {
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
export const RegisterUserDocument = `
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(registerUserInput: $input) {
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
export const ChangeGroupDocument = `
    mutation ChangeGroup($input: ChangeGroupInput!) {
  changeGroup(changeGroupInput: $input) {
    msg
  }
}
    `;
export const useChangeGroupMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<ChangeGroupMutation, TError, ChangeGroupMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<ChangeGroupMutation, TError, ChangeGroupMutationVariables, TContext>(
      ['ChangeGroup'],
      (variables?: ChangeGroupMutationVariables) => fetcher<ChangeGroupMutation, ChangeGroupMutationVariables>(client, ChangeGroupDocument, variables, headers)(),
      options
    );
useChangeGroupMutation.fetcher = (client: GraphQLClient, variables: ChangeGroupMutationVariables, headers?: RequestInit['headers']) => fetcher<ChangeGroupMutation, ChangeGroupMutationVariables>(client, ChangeGroupDocument, variables, headers);
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
export const GetAttendanceByGroupIdAndDayDocument = `
    query GetAttendanceByGroupIdAndDay($attendanceByGroupIdAndDayInput: AttendanceByGroupIdAndDayInput!) {
  getAttendanceByGroupIdAndDay(
    attendanceByGroupIdAndDayInput: $attendanceByGroupIdAndDayInput
  ) {
    day
    present
    status
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
export const useGetAttendanceByGroupIdAndDayQuery = <
      TData = GetAttendanceByGroupIdAndDayQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAttendanceByGroupIdAndDayQueryVariables,
      options?: UseQueryOptions<GetAttendanceByGroupIdAndDayQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAttendanceByGroupIdAndDayQuery, TError, TData>(
      ['GetAttendanceByGroupIdAndDay', variables],
      fetcher<GetAttendanceByGroupIdAndDayQuery, GetAttendanceByGroupIdAndDayQueryVariables>(client, GetAttendanceByGroupIdAndDayDocument, variables, headers),
      options
    );

useGetAttendanceByGroupIdAndDayQuery.getKey = (variables: GetAttendanceByGroupIdAndDayQueryVariables) => ['GetAttendanceByGroupIdAndDay', variables];
;

useGetAttendanceByGroupIdAndDayQuery.fetcher = (client: GraphQLClient, variables: GetAttendanceByGroupIdAndDayQueryVariables, headers?: RequestInit['headers']) => fetcher<GetAttendanceByGroupIdAndDayQuery, GetAttendanceByGroupIdAndDayQueryVariables>(client, GetAttendanceByGroupIdAndDayDocument, variables, headers);
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
        dateJoined
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
export const CreateLostTraineeDocument = `
    mutation createLostTrainee($input: CreateLostTraineeInput!) {
  createLostTrainee(createLostTraineeInput: $input) {
    msg
  }
}
    `;
export const useCreateLostTraineeMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateLostTraineeMutation, TError, CreateLostTraineeMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateLostTraineeMutation, TError, CreateLostTraineeMutationVariables, TContext>(
      ['createLostTrainee'],
      (variables?: CreateLostTraineeMutationVariables) => fetcher<CreateLostTraineeMutation, CreateLostTraineeMutationVariables>(client, CreateLostTraineeDocument, variables, headers)(),
      options
    );
useCreateLostTraineeMutation.fetcher = (client: GraphQLClient, variables: CreateLostTraineeMutationVariables, headers?: RequestInit['headers']) => fetcher<CreateLostTraineeMutation, CreateLostTraineeMutationVariables>(client, CreateLostTraineeDocument, variables, headers);
export const CreatePaymentIntentDocument = `
    mutation createPaymentIntent($input: CreatePaymentIntentInput!) {
  createPaymentIntent(createPaymentIntentInput: $input) {
    clientSecret
  }
}
    `;
export const useCreatePaymentIntentMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePaymentIntentMutation, TError, CreatePaymentIntentMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePaymentIntentMutation, TError, CreatePaymentIntentMutationVariables, TContext>(
      ['createPaymentIntent'],
      (variables?: CreatePaymentIntentMutationVariables) => fetcher<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>(client, CreatePaymentIntentDocument, variables, headers)(),
      options
    );
useCreatePaymentIntentMutation.fetcher = (client: GraphQLClient, variables: CreatePaymentIntentMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePaymentIntentMutation, CreatePaymentIntentMutationVariables>(client, CreatePaymentIntentDocument, variables, headers);
export const CreatePaymentItemDocument = `
    mutation createPaymentItem($input: CreatePaymentItemInput!) {
  createPaymentItem(createPaymentItemInput: $input) {
    msg
  }
}
    `;
export const useCreatePaymentItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreatePaymentItemMutation, TError, CreatePaymentItemMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreatePaymentItemMutation, TError, CreatePaymentItemMutationVariables, TContext>(
      ['createPaymentItem'],
      (variables?: CreatePaymentItemMutationVariables) => fetcher<CreatePaymentItemMutation, CreatePaymentItemMutationVariables>(client, CreatePaymentItemDocument, variables, headers)(),
      options
    );
useCreatePaymentItemMutation.fetcher = (client: GraphQLClient, variables: CreatePaymentItemMutationVariables, headers?: RequestInit['headers']) => fetcher<CreatePaymentItemMutation, CreatePaymentItemMutationVariables>(client, CreatePaymentItemDocument, variables, headers);
export const DeleteTraineeWithMessageDocument = `
    mutation DeleteTraineeWithMessage($input: DeleteTraineeWithMessageInput!) {
  deleteTraineeWithMessage(deleteTraineeWithMessageInput: $input) {
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
export const useDeleteTraineeWithMessageMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<DeleteTraineeWithMessageMutation, TError, DeleteTraineeWithMessageMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<DeleteTraineeWithMessageMutation, TError, DeleteTraineeWithMessageMutationVariables, TContext>(
      ['DeleteTraineeWithMessage'],
      (variables?: DeleteTraineeWithMessageMutationVariables) => fetcher<DeleteTraineeWithMessageMutation, DeleteTraineeWithMessageMutationVariables>(client, DeleteTraineeWithMessageDocument, variables, headers)(),
      options
    );
useDeleteTraineeWithMessageMutation.fetcher = (client: GraphQLClient, variables: DeleteTraineeWithMessageMutationVariables, headers?: RequestInit['headers']) => fetcher<DeleteTraineeWithMessageMutation, DeleteTraineeWithMessageMutationVariables>(client, DeleteTraineeWithMessageDocument, variables, headers);
export const GetAttendanceByUserIdDocument = `
    query GetAttendanceByUserId($id: String!) {
  getAttendanceByUserId(id: $id) {
    day
    present
  }
}
    `;
export const useGetAttendanceByUserIdQuery = <
      TData = GetAttendanceByUserIdQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetAttendanceByUserIdQueryVariables,
      options?: UseQueryOptions<GetAttendanceByUserIdQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAttendanceByUserIdQuery, TError, TData>(
      ['GetAttendanceByUserId', variables],
      fetcher<GetAttendanceByUserIdQuery, GetAttendanceByUserIdQueryVariables>(client, GetAttendanceByUserIdDocument, variables, headers),
      options
    );

useGetAttendanceByUserIdQuery.getKey = (variables: GetAttendanceByUserIdQueryVariables) => ['GetAttendanceByUserId', variables];
;

useGetAttendanceByUserIdQuery.fetcher = (client: GraphQLClient, variables: GetAttendanceByUserIdQueryVariables, headers?: RequestInit['headers']) => fetcher<GetAttendanceByUserIdQuery, GetAttendanceByUserIdQueryVariables>(client, GetAttendanceByUserIdDocument, variables, headers);
export const GetMonthlyExercisesDocument = `
    query GetMonthlyExercises($input: GetMonthlyExercisesInput!) {
  getMonthlyExercises(getMonthlyExercisesInput: $input) {
    monthObjects {
      month
      exercises {
        id
        day
      }
      payed
    }
    price
  }
}
    `;
export const useGetMonthlyExercisesQuery = <
      TData = GetMonthlyExercisesQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetMonthlyExercisesQueryVariables,
      options?: UseQueryOptions<GetMonthlyExercisesQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetMonthlyExercisesQuery, TError, TData>(
      ['GetMonthlyExercises', variables],
      fetcher<GetMonthlyExercisesQuery, GetMonthlyExercisesQueryVariables>(client, GetMonthlyExercisesDocument, variables, headers),
      options
    );

useGetMonthlyExercisesQuery.getKey = (variables: GetMonthlyExercisesQueryVariables) => ['GetMonthlyExercises', variables];
;

useGetMonthlyExercisesQuery.fetcher = (client: GraphQLClient, variables: GetMonthlyExercisesQueryVariables, headers?: RequestInit['headers']) => fetcher<GetMonthlyExercisesQuery, GetMonthlyExercisesQueryVariables>(client, GetMonthlyExercisesDocument, variables, headers);
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