import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends OmitType(CreateCustomerDto, ['password'] as const) {
    _id:string
}
