import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateUserDTO, FindOneUserDTO, UpdateUserDTO } from './user.dto';
import { lastValueFrom } from 'rxjs';
import { UserServiceClient } from '../../grpc/types/user/user';

@Injectable()
export class UserService {
  private user: UserServiceClient;
  constructor(@Inject('user') private readonly userClient: ClientGrpc) {
    this.user = this.userClient.getService<UserServiceClient>('UserService');
  }

  public createUser(data: CreateUserDTO) {
    return this.user.createUser(data);
  }

  public findUser(data: FindOneUserDTO) {
    return this.user.findOneUser(data);
  }

  public async updateUser(data: UpdateUserDTO) {
    return this.user.updateUser(data);
  }
}
