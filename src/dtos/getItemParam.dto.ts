import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetItemParam {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;
}
