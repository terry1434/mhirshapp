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
    @ApiProperty({ description: '控件类型', example: 'textbox' })
    @prop()
    ctlType: string
    @ApiProperty({ description: '控件属性1', example: '[选项1,选项2,...]' })
    @prop()
    ctlAttr1: Array<any>
    @ApiProperty({ description: '控件属性2', example: 'textbox' })
    @prop()
    ctlAttr2: string
    @ApiProperty({ description: '输入格式', example: 'yyyy/MM/dd' })
    @prop()
    ctlFormat: string
}