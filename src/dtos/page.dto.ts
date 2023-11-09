export class PageDto {
  take: number;
  skip: number;

  constructor(limit: number, page: number, skip: number = 0) {
    this.take = limit;
    this.skip = Math.max(Math.max(page - 1, 0) * limit, skip);
  }
}
