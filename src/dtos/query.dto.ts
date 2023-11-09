import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class QueryDto {
  //   @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  readonly limit: number = 10; // default

  //   @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  readonly skip: number = 0; // default

  @Type(() => Number)
  @IsOptional()
  @Min(1)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  readonly page: number = 1; // default
}
