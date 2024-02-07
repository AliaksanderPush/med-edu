import { IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class CreateManSlotDto {
  @IsNotEmpty()
  @IsString()
  managerId: string;

  @IsNotEmpty()
  @IsNumber()
  @Max(1000)
  limit: number;
}
