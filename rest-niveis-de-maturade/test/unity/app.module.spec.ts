import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../../src/app.controller';
import { AppService } from '../../src/app.service';
import { Book } from '../../src/books/entities/book.entity';

describe('AppModule', () => {
  let app: TestingModule;
  let appController: AppController;
  let appService: AppService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
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

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should have AppController defined', () => {
    expect(appController.getHello()).toBe('Running!');
  });

  it('should have AppService defined', () => {
    expect(appService.getHello()).toBe('Running!');
  });

  it('should have TypeOrmModule configured correctly', () => {
    const typeOrmModuleOptions = app.get('TypeOrmModuleOptions');
    expect(typeOrmModuleOptions).toEqual({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      database: 'postgres',
      synchronize: true,
      entities: [Book],
      autoLoadEntities: true,
    });
  });
});
