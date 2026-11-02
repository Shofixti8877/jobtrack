import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApplicationsModule } from './applications/applications.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jobtrack',
      password: 'jobtrack',
      database: 'jobtrack',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ApplicationsModule,
  ],
})
export class AppModule {}
