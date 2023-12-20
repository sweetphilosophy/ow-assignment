import {
  IsString,
  MaxLength,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['ADMIN', 'PERSONAL', 'VIEWER'], { each: true })
  @IsOptional()
  roles?: Array<string>;

  @IsArray()
  @ArrayNotEmpty()
  @IsIn(['GROUP_1', 'GROUP_2'], { each: true })
  @IsOptional()
  groups?: Array<string>;
}
