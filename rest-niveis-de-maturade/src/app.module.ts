import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';
import { AcceptNegotiationInterceptor } from './interceptors/accept.negotiation.interceptor';
import { ContentTypeNegotiationInterceptor } from './interceptors/content-type-negotiation.interceptor';
import { MethodNegotiationInterceptor } from './interceptors/method-negotiation.interceptor';

@Module({
  imports: [
    BooksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pgsql',
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
  providers: [
    AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ContentTypeNegotiationInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: MethodNegotiationInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: AcceptNegotiationInterceptor,
    },
  ],
})
export class AppModule {}
