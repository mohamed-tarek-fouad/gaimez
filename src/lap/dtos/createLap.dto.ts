/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
export class LapDto {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  company: string;
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  model: string;
  @IsNotEmpty()
  @MaxLength(4)
  @ApiProperty()
  year: string;
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
