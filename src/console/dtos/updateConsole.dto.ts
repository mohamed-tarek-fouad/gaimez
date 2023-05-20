import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";
export class UpdateConsoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  @IsOptional()
  model: string;
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  @IsOptional()
  type: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  price: number;
}
