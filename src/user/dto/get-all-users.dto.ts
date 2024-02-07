import { IsOptional } from 'class-validator';

export class GetAllUsersSDto {
  @IsOptional()
  skip: number;

  @IsOptional()
  take: number;

  @IsOptional()
  search?: string;
}
