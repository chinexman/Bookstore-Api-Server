import { GetItemsQueryDto } from 'src/dtos/getItemsQuery.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

export interface IService<Type> {
  getItems: (query: GetItemsQueryDto) => Promise<PaginationDto<Type>>;
}
