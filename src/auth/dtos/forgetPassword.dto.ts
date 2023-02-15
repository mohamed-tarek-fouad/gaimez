/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsEmail } from "class-validator";
export class ForgetPasswordDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
