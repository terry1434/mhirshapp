import { prop, arrayProp, Ref, modelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})
export class Category {
    @ApiProperty({ description: '业务ID', example: '900' })
    @prop()
    kbnId: string
    @ApiProperty({ description: '业务名称', example: '业务1' })
    @prop()
    kbnName: string
    @ApiProperty({ description: '科目1', example: 'A科目' })
    @prop()
    ken1: string
    @ApiProperty({ description: '科目2', example: 'B科目' })
    @prop()
    ken2: string
    @ApiProperty({ description: '项目类型1', example: 'textbox' })
    @prop()
    ctlType1: string
    @ApiProperty({ description: '项目类型2', example: 'textbox' })
    @prop()
    ctlType2: string
    @ApiProperty({ description: '项目类型3', example: 'textbox' })
    @prop()
    ctlType3: string
}