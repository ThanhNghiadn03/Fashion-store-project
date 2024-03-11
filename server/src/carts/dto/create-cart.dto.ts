import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class CreateCartDto {
    @IsNotEmpty({
        message: 'Phải có mã sản phẩm'
    })
    idProduct: string;
    @IsNotEmpty({
        message: 'Phải có mã khách hàng'
    })
    idCustomers: string;

    idOrder: string;

    @IsNumber({},{
        message: 'Số lượng nhập sai định dạng'
    })
    @Max(100)
    @Min(1)
    @Type(() => Number)
    quantity: number;

    price: number;

    imageProduct: string;

    nameProduct: string;
}
