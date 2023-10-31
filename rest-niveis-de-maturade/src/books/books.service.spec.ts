import { Repository } from 'typeorm';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

describe('BooksService', () => {
  let service: BooksService;
  let mockRepository: jest.Mocked<Repository<Book>>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    service = new BooksService(mockRepository);
  });

  it('should create a book and return HATEOAS links', async () => {
    const bookDto: CreateBookDto = { title: 'The Lord of the Rings' };
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    mockRepository.create.mockReturnValue(book);
    mockRepository.save.mockResolvedValue(book);

    const result = await service.create(bookDto);

    expect(result.data).toEqual(book);
    expect(result.links.self).toEqual(`http://localhost:3000/books/${book.id}`);
    expect(result.links.update).toEqual(
      `http://localhost:3000/books/${book.id}`,
    );
    expect(result.links.delete).toEqual(
      `http://localhost:3000/books/${book.id}`,
    );
  });

  it('should find all books and return HATEOAS links', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };
    mockRepository.find.mockResolvedValue([book]);

    const result = await service.findAll(10, 1);

    expect(result.data).toEqual([book]);
    expect(result.links.first).toEqual(
      `http://localhost:3000/books?limit=10&page=1`,
    );
    expect(result.links.last).toEqual(
      `http://localhost:3000/books?limit=10&page=1`,
    );
  });

  it('should find one book and return HATEOAS links', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };
    mockRepository.findOne.mockResolvedValue(book);

    const result = await service.findOne(
      '69ad42b0-ac38-4698-b0a0-53b33423bc15',
    );

    expect(result.data).toEqual(book);
    expect(result.links.self).toEqual(`http://localhost:3000/books/${book.id}`);
    expect(result.links.update).toEqual(
      `http://localhost:3000/books/${book.id}`,
    );
    expect(result.links.delete).toEqual(
      `http://localhost:3000/books/${book.id}`,
    );
  });

  it('should update a book and return HATEOAS links', async () => {
    const bookDto: UpdateBookDto = { title: 'Updated Book' };
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    mockRepository.findOne.mockResolvedValue(book);
    mockRepository.update.mockResolvedValue(undefined);

    const result = await service.update(
      '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      bookDto,
    );

    expect(result.data).toEqual(book);
    expect(result.links.self).toEqual(`http://localhost:3000/books/${book.id}`);
    expect(result.links.update).toEqual(
      `http://localhost:3000/books/${book.id}`,
    );
    expect(result.links.delete).toEqual(
      `http://localhost:3000/books/${book.id}`,
    );
  });

  it('should remove a book and return the removed book', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    mockRepository.findOne.mockResolvedValue(book);
    mockRepository.delete.mockResolvedValue(undefined);

    const result = await service.remove('69ad42b0-ac38-4698-b0a0-53b33423bc15');

    expect(result.data).toEqual(book);
  });
});
