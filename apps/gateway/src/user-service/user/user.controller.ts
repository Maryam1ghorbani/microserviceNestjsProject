import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO, FindOneUserDTO, UpdateUserDTO } from './user.dto';
import { UserService } from './user.service';
import { query } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Post('create')
  public async createUser(@Body() data: CreateUserDTO) {
    return this.user.createUser(data);
  }

  @Get('find')
  public async findUser(@Query() data: FindOneUserDTO) {
    return this.user.findUser(data);
  }

  @Put('update')
  public async updateUser(@Body() data: UpdateUserDTO) {
    return this.user.updateUser(data);
  }
}
