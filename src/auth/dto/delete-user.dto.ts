import { IsNotEmpty } from 'class-validator';

export class DeleteUserAcccountDto {
  @IsNotEmpty()
  id: string;
}
