import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginatorDto {
  @IsNumber()
  // Marcamos que sea opcional, en caso de no necesitar enviarlo
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage: number;
}