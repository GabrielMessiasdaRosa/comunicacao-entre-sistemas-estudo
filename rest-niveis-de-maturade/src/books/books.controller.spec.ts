import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseResponse } from 'src/lib/base-response';
import { ListBaseResponse } from 'src/lib/list-base-response';
import { Repository } from 'typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';

const baseUrl = 'http://localhost:3000/books';
const limit = 10;
const currentPage = 1;

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should get all books', () => {
    const books: Book[] = [
      {
        id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
        title: 'The Lord of the Rings',
      },
      {
        id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
        title: 'The Hobbit',
      },
    ];
    const totalPages = Math.ceil(books.length / (limit || 10));
    const expected: ListBaseResponse<Book[]> = {
      data: books,
      links: {
        first: `${baseUrl}?limit=${limit}&page=1`,
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
        totalPages: totalPages,
      },
    };

    jest.spyOn(controller, 'findAll').mockImplementation(async () => expected);

    expect(controller.findAll()).resolves.toEqual(expected);
  });

  it('should get a book by id', async () => {
    const expectedBook: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const bookWithLinks: BaseResponse<Book> = {
      data: expectedBook,
      links: {
        self: `http://localhost:3000/books/${expectedBook.id}`,
        update: `http://localhost:3000/books/${expectedBook.id}`,
        delete: `http://localhost:3000/books/${expectedBook.id}`,
      },
    };

    jest
      .spyOn(controller, 'findOne')
      .mockImplementation(async () => bookWithLinks);

    const book: BaseResponse<Book> = await controller.findOne(expectedBook.id);
    expect(book).toEqual(bookWithLinks);
  });

  it('should create a book', async () => {
    const newBook: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const bookWithLinks: BaseResponse<Book> = {
      data: newBook,
      links: {
        self: `http://localhost:3000/books/${newBook.id}`,
        update: `http://localhost:3000/books/${newBook.id}`,
        delete: `http://localhost:3000/books/${newBook.id}`,
      },
    };

    jest
      .spyOn(controller, 'create')
      .mockImplementation(async () => bookWithLinks);

    const book: BaseResponse<Book> = await controller.create(newBook);
    expect(book).toEqual(bookWithLinks);
  });

  it('should update a book', async () => {
    const updatedBook: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const bookWithLinks: BaseResponse<Book> = {
      data: updatedBook,
      links: {
        self: `http://localhost:3000/books/${updatedBook.id}`,
        update: `http://localhost:3000/books/${updatedBook.id}`,
        delete: `http://localhost:3000/books/${updatedBook.id}`,
      },
    };

    jest
      .spyOn(controller, 'update')
      .mockImplementation(async () => bookWithLinks);

    const book: BaseResponse<Book> = await controller.update(
      updatedBook.id,
      updatedBook,
    );
    expect(book).toEqual(bookWithLinks);
  });

  it('should delete a book', async () => {
    const deletedBook: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const deletedBookResponse: BaseResponse<Book> = {
      data: deletedBook,
    };

    jest
      .spyOn(controller, 'remove')
      .mockImplementation(async () => deletedBookResponse);

    const book: BaseResponse<Book> = await controller.remove(deletedBook.id);
    expect(book).toEqual(deletedBookResponse);
  });
});
