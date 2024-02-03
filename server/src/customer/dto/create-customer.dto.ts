import {IsDateString, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, Length, MinLength } from 'class-validator';

export type allGender = 'Nam' | 'Nữ';

export const allGenders: allGender[] = [
  'Nam',
  'Nữ',
  // other
]

export class CreateCustomerDto {
    fullName: string;

    @IsEnum(allGenders, {
        message: 'Mời bạn nhập lại giới tính'
    })
    gender: allGender;

    @IsDateString({}, { 
        each: true,
        message: 'Ngày sinh phải đúng định dạng YYYY-MM-DD'
    })
    dateOfBirth: Date;

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

    city: string;
    district: string;
    detailAddress: string;
}

