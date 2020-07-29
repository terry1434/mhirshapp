import { prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class User{

    @ApiProperty({ description:"用户ID"})
    @prop()
    ID:string

    @ApiProperty({ description:"用户名"})
    @prop()
    username:string

    @ApiProperty({ description:"密码"})
    @prop()
    password:string

    
}