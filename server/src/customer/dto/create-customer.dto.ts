import {IsEmail, IsMobilePhone, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateCustomerDto {
    firstName: string;
    lastName: string;

    @IsEmail({},{
        message: 'Email sai định dạng'
    })
    email: string;

    @IsMobilePhone('vi-VN',{},{
        message: 'Sai định dạng số điện thoại'
    })
    phoneNumber: string;

    @IsNotEmpty({
        message: 'Không được để trống'
    })
    @MinLength(7, {
        message: 'Mật khẩu phải có ít nhất 7 kí tự'
    })
    password: string;
}

