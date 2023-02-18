/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export class UpdateLapDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(20)
  company: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(20)
  model: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(4)
  year: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  price: number;
}
