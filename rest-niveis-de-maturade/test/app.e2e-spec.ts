import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { BooksModule } from '../src/books/books.module';
import { Book } from '../src/books/entities/book.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        BooksModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: 'postgres',
          username: 'postgres',
          database: 'postgres',
          synchronize: true,
          entities: [Book],
          autoLoadEntities: true,
        }),
      ],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('Running!');
  });
});
