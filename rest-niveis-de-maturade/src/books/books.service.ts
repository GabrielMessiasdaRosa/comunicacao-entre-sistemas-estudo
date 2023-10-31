import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.booksRepository.create(createBookDto);
    await this.booksRepository.save(newBook);
    return newBook;
  }

  async findAll(): Promise<Book[]> {
    return await this.booksRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    if (!id) {
      throw new Error('Id is required');
    }
    const book = await this.booksRepository.findOne({ where: { id: id } });
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    if (!id) {
      throw new Error('Id is required');
    }
    const book = await this.findOne(id);
    await this.booksRepository.update(book.id, updateBookDto);
    return book;
  }

  async remove(id: string): Promise<Book> {
    if (!id) {
      throw new Error('Id is required');
    }
    const book = await this.findOne(id);
    await this.booksRepository.delete(book);
    return book;
  }
}
