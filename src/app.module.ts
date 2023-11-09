import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envNames } from './constants';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.getOrThrow(envNames.DB_NAME) as string,
          synchronize:
            configService.get(envNames.NODE_ENV) === 'development'
              ? true
              : false,
          entities: [__dirname + '/**/*.entity{.js,.ts}'],
        };
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    BookModule,
    AuthorModule,
  ],
})
export class AppModule {}
