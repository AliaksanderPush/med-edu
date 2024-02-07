import { IsNotEmpty, IsString } from 'class-validator';

export class AddToManSlotDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
