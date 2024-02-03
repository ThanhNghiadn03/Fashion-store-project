import {IsNotEmpty } from 'class-validator';

export class CreateVoucherDto {
    @IsNotEmpty({
        message: 'Phải nhập mã giảm giá.'
    })
    idVoucher: string;

    @IsNotEmpty({
        message: 'Phải nhập loại giảm giá.'
    })
    typeVoucher: string;

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

