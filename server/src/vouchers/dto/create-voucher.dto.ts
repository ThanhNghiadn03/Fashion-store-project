import {IsNotEmpty } from 'class-validator';

export class CreateVoucherDto {
    @IsNotEmpty({
        message: 'Phải nhập mã giảm giá.'
    })
    id: string;

    @IsNotEmpty({
        message: 'Phải nhập loại giảm giá.'
    })
    type: string;

    @IsNotEmpty({
        message: 'Phải nhập số lượng voucher.'
    })
    quantity: number;

    @IsNotEmpty({
        message: 'Phải nhập giá trị của mã giảm.'
    })
    discount: number;
    description:string;

    @IsNotEmpty({
        message: 'Phải nhập ngày bắt đầu.'
    })
    startDate: string;

    @IsNotEmpty({
        message: 'Phải nhập ngày kết thúc.'
    })
    endDate: string;
}

