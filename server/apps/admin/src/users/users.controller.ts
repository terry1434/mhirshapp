import { Controller, Inject } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'libs/db/models/user.model';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model: User
})
@ApiTags('账户管理')
@Controller('users')
export class UsersController {
    constructor(@InjectModel(User) private readonly model) { }
}

