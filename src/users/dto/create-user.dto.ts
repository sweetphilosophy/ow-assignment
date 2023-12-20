import {
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['ADMIN', 'PERSONAL'], { each: true })
  roles: Array<string>;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['GROUP_1', 'GROUP_2'], { each: true })
  groups: Array<string>;
}
