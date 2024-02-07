import { SessionStatus } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  skip: number;

  @IsOptional()
  take: number;

  @IsOptional()
  search?: string;

  @IsEnum(SessionStatus)
  @IsOptional()
  sessionStatus?: SessionStatus;
}
