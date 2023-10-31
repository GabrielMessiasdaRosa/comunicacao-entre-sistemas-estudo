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

  it('should create a book', async () => {
    const bookDto: CreateBookDto = { title: 'The Lord of the Rings' };
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    mockRepository.create.mockReturnValue(book);
    mockRepository.save.mockResolvedValue(book);

    const result = await service.create(bookDto);

    expect(result).toEqual(book);
    expect(mockRepository.create).toHaveBeenCalledWith(bookDto);
    expect(mockRepository.save).toHaveBeenCalledWith(book);
  });

  it('should find all books', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };
    mockRepository.find.mockResolvedValue([book]);

    const result = await service.findAll();

    expect(result).toEqual([book]);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('should find one book', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };
    mockRepository.findOne.mockResolvedValue(book);

    const result = await service.findOne(
      '69ad42b0-ac38-4698-b0a0-53b33423bc15',
    );

    expect(result).toEqual(book);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: '69ad42b0-ac38-4698-b0a0-53b33423bc15' },
    });
  });

  it('should update a book', async () => {
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

    expect(result).toEqual(book);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: '69ad42b0-ac38-4698-b0a0-53b33423bc15' },
    });
    expect(mockRepository.update).toHaveBeenCalledWith(
      '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      bookDto,
    );
  });

  it('should remove a book', async () => {
    const book: Book = {
      id: '69ad42b0-ac38-4698-b0a0-53b33423bc15',
      title: 'The Lord of the Rings',
    };

    mockRepository.findOne.mockResolvedValue(book);
    mockRepository.delete.mockResolvedValue(undefined);

    const result = await service.remove('69ad42b0-ac38-4698-b0a0-53b33423bc15');

    expect(result).toEqual(book);
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: '69ad42b0-ac38-4698-b0a0-53b33423bc15' },
    });
    expect(mockRepository.delete).toHaveBeenCalledWith(book);
  });
});
