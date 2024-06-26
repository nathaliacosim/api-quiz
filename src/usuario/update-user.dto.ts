import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsNumber,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  nick?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @MinLength(8)
  phoneNumber?: string;
}
