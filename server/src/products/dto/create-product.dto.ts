import { Type } from 'class-transformer';
import {IsNotEmpty, IsNumber, IsNumberString, Max, Min } from 'class-validator';
import mongoose from 'mongoose';
// data transfer object
export class CreateProductDto {
    nameProduct: string;

    @IsNotEmpty({
        message: 'Phải nhập giá sản phẩm'
    })
    @IsNumber({},{
        message: 'Giá cả sai định dạng'
    })
    @Type(() => Number)
    price: number;

    @IsNotEmpty({
        message: 'Phải nhập giảm giá'
    })
    @IsNumber({},{
        message: 'Mã giảm sai định dạng'
    })
    @Max(100)
    @Min(0)
    @Type(() => Number)
    discount: number;

    descriptionProduct: string;
    imageProduct: string;
    idEvaluated: string;

    
    @IsNotEmpty({
        message: 'Phải nhập số lượng sản phẩm'
    })
    @IsNumber({},{
        message: 'Số lượng sản phẩm sai định dạng'
    })
    @Max(200, {
        message: "Số lượng sản phẩm không vượt quá 200"
    })
    @Min(1, {
        message: "Số lượng sản phẩm phải lớn hơn 0"
    })
    @Type(() => Number)
    quantity: number;

    @IsNotEmpty({
        message: 'Phải có id danh mục'
    })
    idCategory: string;
}
