import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  UpdateUserDTO,
  FindOneUserDTO,
} from '../grpc/types/user';
import { Observable } from 'rxjs';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'createUser')
  public async createUser(data: CreateUserDTO) {
    return this.userService.createUser(data);
  }
  @GrpcMethod('UserService', 'findOneUser')
  public async findOneUser(data: FindOneUserDTO) {
    return this.userService.findOneUser(data);
  }
  @GrpcMethod('UserService', 'updateUser')
  public async updateUser(data: UpdateUserDTO) {
    return this.userService.updateUser(data);
  }
}
