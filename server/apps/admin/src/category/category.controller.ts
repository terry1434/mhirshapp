import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Category } from 'libs/db/models/category.model';
import { InjectModel } from 'nestjs-typegoose';
import { ApiTags } from '@nestjs/swagger';

@Crud({
    model:Category
})
@ApiTags('项目管理')
@Controller('category')
export class CategoryController {
    constructor(@InjectModel(Category) private readonly model){}
}
