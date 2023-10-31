import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseResponse } from 'src/lib/base-response';
import { ListBaseResponse } from 'src/lib/list-base-response';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
const baseUrl = 'http://localhost:3000/books';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BaseResponse<Book>> {
    const newBook = this.booksRepository.create(createBookDto);
    await this.booksRepository.save(newBook);
    return {
      data: newBook,
      links: {
        self: `http://localhost:3000/books/${newBook.id}`,
        update: `http://localhost:3000/books/${newBook.id}`,
        delete: `http://localhost:3000/books/${newBook.id}`,
      },
    };
  }

  async findAll(
    limit?: number,
    page?: number,
  ): Promise<ListBaseResponse<Book[]>> {
    const books = await this.booksRepository.find({
      skip: limit * (page - 1) || 0,
      take: limit || 10,
    });
    const totalPages = Math.ceil(books.length / (limit || 10));
    const currentPage = page || 1;
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

  async findOne(id: string): Promise<BaseResponse<Book>> {
    if (!id) {
      throw new Error('Id is required');
    }
    const book = await this.booksRepository.findOne({ where: { id: id } });
    return {
      data: book,
      links: {
        self: `http://localhost:3000/books/${book.id}`,
        update: `http://localhost:3000/books/${book.id}`,
        delete: `http://localhost:3000/books/${book.id}`,
      },
    };
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
  ): Promise<BaseResponse<Book>> {
    if (!id) {
      throw new Error('Id is required');
    }
    const book = await this.booksRepository.findOne({ where: { id: id } });
    await this.booksRepository.update(book.id, updateBookDto);
    return {
      data: book,
      links: {
        self: `http://localhost:3000/books/${book.id}`,
        update: `http://localhost:3000/books/${book.id}`,
        delete: `http://localhost:3000/books/${book.id}`,
      },
    };
  }

  async remove(id: string): Promise<BaseResponse<Book>> {
    if (!id) {
      throw new Error('Id is required');
    }
    const book = await this.booksRepository.findOne({ where: { id: id } });
    await this.booksRepository.delete(book);
    return {
      data: book,
    };
  }
}
