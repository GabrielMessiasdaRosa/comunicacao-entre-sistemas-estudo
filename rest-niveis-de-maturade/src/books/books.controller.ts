import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BaseResponse } from 'src/lib/base-response';
import { ListBaseResponse } from 'src/lib/list-base-response';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BaseResponse<Book>> {
    const response = await this.booksService.create(createBookDto);
    return response;
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ListBaseResponse<Book[]>> {
    const response = await this.booksService.findAll(limit, page);
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Book>> {
    const response = await this.booksService.findOne(id);
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BaseResponse<Book>> {
    const response = await this.booksService.update(id, updateBookDto);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseResponse<Book>> {
    const response = await this.booksService.remove(id);
    return response;
  }
}
