export class PaginationDto<T> {
  data: T[];
  page: number;
  totalItems: number;

  constructor(entities: T[], itemsCount: number, page: number) {
    this.page = page;
    this.totalItems = itemsCount;
    this.data = entities;
  }
}
