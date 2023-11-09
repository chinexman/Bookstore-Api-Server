import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { envNames } from 'src/constants';

export const sqliteConfig: TypeOrmModuleAsyncOptions = {
  useFactory: (configService: ConfigService) => {
    return {
      type: 'sqlite',
      database: configService.getOrThrow(envNames.DB_NAME) as string,
      synchronize:
        configService.get(envNames.NODE_ENV) === 'development' ? true : false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    };
  },
  imports: [ConfigModule],
  inject: [ConfigService],
};
