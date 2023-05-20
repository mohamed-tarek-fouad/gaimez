import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";
export class CreateConsoleDto {
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(20)
  model: string;
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  type: string;
  @IsNotEmpty()
  @ApiProperty()
  price: number;
}
