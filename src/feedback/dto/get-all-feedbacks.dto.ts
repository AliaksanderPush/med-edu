import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllfeddbacksDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;
}
