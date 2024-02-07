import { IsNotEmpty, IsString } from 'class-validator';

export class BookingSessionDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
