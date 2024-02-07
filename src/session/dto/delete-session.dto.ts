import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSessionDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
