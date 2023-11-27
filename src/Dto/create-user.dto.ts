import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  @IsNotEmpty()
  readonly userName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  readonly age: number;
}
