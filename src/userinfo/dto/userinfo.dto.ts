import { IsInt, IsOptional, Length, Max } from 'class-validator';

export class UserInfoDto {
  @Length(2, 30)
  firstName: string;

  @Length(2, 30)
  lastName: string;

  @Length(2, 30)
  hospital: string;

  @IsOptional()
  @Length(3, 30)
  department?: string;

  @IsOptional()
  @Length(1, 30)
  grade?: string;

  @IsOptional()
  @Length(1, 30)
  yearGroup?: string;

  @IsOptional()
  @IsInt()
  @Max(1000)
  numOfStud?: number;

  @IsOptional()
  @IsInt()
  @Max(1000)
  incomeFeedBacks?: number;

  @IsOptional()
  @IsInt()
  @Max(1000)
  feedBacks?: number;
}
