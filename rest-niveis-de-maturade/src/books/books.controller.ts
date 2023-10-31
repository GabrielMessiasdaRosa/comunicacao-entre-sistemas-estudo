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
const baseUrl = 'http://localhost:3000/books';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
  ): Promise<BaseResponse<Book>> {
    const newbook = await this.booksService.create(createBookDto);
    return {
      data: newbook,
      links: {
        self: `http://localhost:3000/books/${newbook.id}`,
        update: `http://localhost:3000/books/${newbook.id}`,
        delete: `http://localhost:3000/books/${newbook.id}`,
      },
    };
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ): Promise<ListBaseResponse<Book[]>> {
    const books = await this.booksService.findAll();
    const totalPages = Math.ceil(books.length / (limit || 10));
    const currentPage = page || 1;
    console.log(Number(totalPages));
    return {
      data: books,
      links: {
        first: `${baseUrl}?limit=${limit}&page=${page}`,
        last: `${baseUrl}?limit=${limit}&page=${totalPages}`,
        next:
          currentPage < totalPages
            ? `${baseUrl}?limit=${limit}&page=${currentPage + 1}`
            : null,
        previous:
          currentPage > 1
            ? `${baseUrl}?limit=${limit}&page=${currentPage - 1}`
            : null,
      },
      meta: {
        currentPage,
        itemCount: books.length,
        itemsPerPage: limit,
        totalPages: Number(totalPages),
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BaseResponse<Book>> {
    const book = await this.booksService.findOne(id);
    return {
      data: book,
      links: {
        self: `http://localhost:3000/books/${book.id}`,
        update: `http://localhost:3000/books/${book.id}`,
        delete: `http://localhost:3000/books/${book.id}`,
      },
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BaseResponse<Book>> {
    await this.booksService.update(id, updateBookDto);
    const book = await this.booksService.findOne(id);
    return {
      data: book,
      links: {
        self: `http://localhost:3000/books/${book.id}`,
        update: `http://localhost:3000/books/${book.id}`,
        delete: `http://localhost:3000/books/${book.id}`,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BaseResponse<Book>> {
    const deletedBook = await this.booksService.findOne(id);
    await this.booksService.remove(id);
    return {
      data: deletedBook,
    };
  }
}
