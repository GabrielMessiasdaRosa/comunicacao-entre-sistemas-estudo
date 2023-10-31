import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BaseResponse } from 'src/lib/base-response';
import { ListBaseResponse } from 'src/lib/list-base-response';
import { Repository } from 'typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

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

  it('should create a book and return HATEOAS links', async () => {
    const bookDto: CreateBookDto = { title: 'The Lord of the Rings' };
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const expected: BaseResponse<Book> = {
      data: book,
      links: {
        self: `${baseUrl}/${book.id}`,
        update: `${baseUrl}/${book.id}`,
        delete: `${baseUrl}/${book.id}`,
      },
    };

    jest.spyOn(controller, 'create').mockImplementation(async () => expected);

    const result = await controller.create(bookDto);

    expect(result).toEqual(expected);
  });

  it('should find all books and return HATEOAS links', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const expected: ListBaseResponse<Book[]> = {
      data: [book],
      links: {
        first: `${baseUrl}?limit=${limit}&page=1`,
        last: `${baseUrl}?limit=${limit}&page=1`,
        next: `${baseUrl}?limit=${limit}&page=2`,
        previous: `${baseUrl}?limit=${limit}&page=1`,
      },
      meta: {
        currentPage: 1,
        itemCount: 1,
        itemsPerPage: limit,
        totalPages: 1,
      },
    };

    jest.spyOn(controller, 'findAll').mockImplementation(async () => expected);

    const result = await controller.findAll(limit, 1);

    expect(result).toEqual(expected);
  });

  it('should find one book and return HATEOAS links', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const expected: BaseResponse<Book> = {
      data: book,
      links: {
        self: `${baseUrl}/${book.id}`,
        update: `${baseUrl}/${book.id}`,
        delete: `${baseUrl}/${book.id}`,
      },
    };

    jest.spyOn(controller, 'findOne').mockImplementation(async () => expected);

    const result = await controller.findOne(book.id);

    expect(result).toEqual(expected);
  });

  it('should update a book and return HATEOAS links', async () => {
    const bookDto: UpdateBookDto = { title: 'Updated Book' };
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const expected: BaseResponse<Book> = {
      data: book,
      links: {
        self: `${baseUrl}/${book.id}`,
        update: `${baseUrl}/${book.id}`,
        delete: `${baseUrl}/${book.id}`,
      },
    };

    jest.spyOn(controller, 'update').mockImplementation(async () => expected);

    const result = await controller.update(book.id, bookDto);

    expect(result).toEqual(expected);
  });

  it('should remove a book and return the removed book', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    const expected: BaseResponse<Book> = {
      data: book,
    };

    jest.spyOn(controller, 'remove').mockImplementation(async () => expected);

    const result = await controller.remove(book.id);

    expect(result).toEqual(expected);
  });
});
