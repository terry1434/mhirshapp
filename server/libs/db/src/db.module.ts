import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Category } from './models/category.model';



const models = TypegooseModule.forFeature([User,Category])

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule { }
