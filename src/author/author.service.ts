import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';
import { IService } from 'src/interfaces/service.interface';
import { GetItemsQueryDto } from 'src/dtos/getItemsQuery.dto';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { PageDto } from 'src/dtos/page.dto';
import { PaginationDto } from 'src/dtos/pagination.dto';

@Injectable()
export class AuthorService implements IService<Author> {
  constructor(
    @InjectRepository(Author) private readonly authorRepo: Repository<Author>,
  ) {}

  create(input: CreateAuthorDto) {
    return this.authorRepo.save(this.authorRepo.create(input));
  }

  async getItems(query: GetItemsQueryDto) {
    const queryBuilder = this.authorRepo.createQueryBuilder();
    const { take, skip } = new PageDto(query.limit, query.page, query.skip);

    queryBuilder.skip(skip).take(take);
    const totalItems = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return new PaginationDto(entities, totalItems, query.page);
  }

  async getItemById(id: number) {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }
}
