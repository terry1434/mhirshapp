import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MytextController } from './mytext/mytext.controller';

@Module({
  imports: [],
  controllers: [AppController, MytextController],
  providers: [AppService],
})
export class AppModule {} 
