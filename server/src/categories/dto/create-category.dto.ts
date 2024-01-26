import {IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
    name: string;
    description: string;
}
