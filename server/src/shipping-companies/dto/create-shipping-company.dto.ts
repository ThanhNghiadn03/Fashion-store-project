import {IsNotEmpty } from 'class-validator';

export class CreateShippingCompanyDto {
    name: string;
    description: string;
    nameContactPerson: string;
    email: string;
    phone: string;
}
