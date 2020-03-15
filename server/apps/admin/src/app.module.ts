import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    CategoryModule,//引入libs下的DbModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
