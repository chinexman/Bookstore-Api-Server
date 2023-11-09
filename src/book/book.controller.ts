import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBookDto } from './dtos/createBook.dto';
import { BookService } from './book.service';
import { GetItemParam } from 'src/dtos/getItemParam.dto';
import { QueryDto } from 'src/dtos/query.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() input: CreateBookDto) {
    return this.bookService.create(input);
  }

  @Get()
  getAllBooks(@Query() query: QueryDto) {
    return this.bookService.getItems(query);
  }

  @Get(':id')
  getBookById(@Param() param: GetItemParam) {
    return this.bookService.getItemById(param.id);
  }
}
