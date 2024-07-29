import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Gender } from '../../grpc/types/user/user.enum';

export class CreateUserDTO {
  @IsString()
  @Length(5, 20)
  username: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsEnum({
    male: 'Male',
    female: 'Female',
  })
  gender: Gender;
}

export class UpdateUserDTO {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  firstname: string;

  @IsOptional()
  @IsString()
  lastname: string;

  @IsEnum({
    male: 'Male',
    female: 'Female',
  })
  gender: Gender;

  @IsOptional()
  @IsNumber()
  amount: number;
}

export class FindOneUserDTO {
  @IsString()
  id: string;
}
