import {IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
    name: string;
    description: string;
}