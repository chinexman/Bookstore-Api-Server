import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { GetItemParam } from 'src/dtos/getItemParam.dto';

import { QueryDto } from 'src/dtos/query.dto';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  createAuthor(@Body() input: CreateAuthorDto) {
    return this.authorService.create(input);
  }

  @Get(':id')
  getAuthorById(@Param() param: GetItemParam) {
    return this.authorService.getItemById(param.id);
  }

  @Get()
  getAllAuthor(@Query() query: QueryDto) {
    return this.authorService.getItems(query);
  }
}
