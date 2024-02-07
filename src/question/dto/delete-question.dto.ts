import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteQuastionDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
