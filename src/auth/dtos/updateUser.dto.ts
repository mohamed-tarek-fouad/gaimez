/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from "class-validator-password-check";
const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateUserDto {
  @ApiProperty({ example: "mohamed" })
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  firstname: string;
  @ApiProperty({ example: "tarek" })
  @IsNotEmpty()
  @IsOptional()
  @MinLength(3)
  lastname: string;
  @ApiProperty({ example: "mdmedoo7@gmail.com" })
  @IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;
  @ApiProperty({ example: "123mM123@" })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @ApiProperty({ example: "fayoum" })
  @IsOptional()
  address: string;
  @ApiProperty({ example: "01006388619" })
  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber: string;
  @ApiProperty({ example: "gamed neeeeeeeeeeeeeeeek" })
  @IsOptional()
  info: string;
}
