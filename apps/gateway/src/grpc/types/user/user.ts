// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.1
//   protoc               v5.27.2
// source: proto/user.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'user';

export interface CreateUserDTO {
  username: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  gender: string;
}

export interface User {
  id: string;
  username: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  gender: string;
}

export interface UserInfo {
  id: string;
  username: string;
  firstname?: string | undefined;
  lastname?: string | undefined;
  gender: string;
  amount: number;
  createdAt: string;
  updateAt: string;
}

export interface Users {
  users: UserInfo[];
}

export interface UpdateUserDTO {
  id: string;
  username?: string | undefined;
  firstname?: string | undefined;
  lastname?: string | undefined;
  gender?: string | undefined;
  amount?: number | undefined;
}

export interface FindOneUserDTO {
  id: string;
}

export interface Empty {}

export interface SetAmountDTO {
  userId: string;
}
export interface GetAmountDTO {
  userId: string;
}

export interface ChangeBalanceDTO {
  userId: string;
  amount: number;
}

export interface UpdateAmountDTO {
  userId: string;
}

export interface UserServiceClient {
  createUser(request: CreateUserDTO): Observable<User>;

  findOneUser(request: FindOneUserDTO): Observable<UserInfo>;

  updateUser(request: UpdateUserDTO): Observable<UserInfo>;
}