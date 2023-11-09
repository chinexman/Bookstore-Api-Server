import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dtos/createBook.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

import { IService } from 'src/interfaces/service.interface';
import { GetItemsQueryDto } from 'src/dtos/getItemsQuery.dto';
import { PageDto } from 'src/dtos/page.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class BookService implements IService<Book> {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: Repository<Book>,
  ) {}
  async create(input: CreateBookDto) {
    const book = this.bookRepo.create(input);

    return this.bookRepo.save(book);
  }

  async getItems(query: GetItemsQueryDto) {
    const queryBuilder = this.bookRepo.createQueryBuilder();

    const { take, skip } = new PageDto(query.limit, query.page, query.skip);
    queryBuilder.skip(skip).take(take);
    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return new PaginationDto(entities, totalItems, query.page);
  }

  async getItemById(id: number) {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException('Book not found!');
    }

    return book;
  }
}
