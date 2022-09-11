import { IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString} from "class-validator";
import { not } from "rxjs/internal/util/not";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({message:"email required"})
  email: string;

  @IsNotEmpty({message:"password required"})
  password: string;

  @IsString()
  @IsNotEmpty({message:"name required"})
  name: string;

  @IsNumber()
  @IsOptional()
  salt?: number;

  @IsOptional()
  gender: string;
}
