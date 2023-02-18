import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class AuthDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
