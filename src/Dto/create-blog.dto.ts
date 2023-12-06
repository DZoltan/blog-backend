import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
  ArrayNotEmpty,
  IsObject,
} from 'class-validator';
import { User } from 'src/Schema/user.schema';

export class CreateBlogDTO {
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  readonly text: string;

  @ArrayMaxSize(10)
  @ArrayNotEmpty()
  readonly tags: string[];

  @IsNotEmpty()
  @IsObject()
  readonly user: User;
}
