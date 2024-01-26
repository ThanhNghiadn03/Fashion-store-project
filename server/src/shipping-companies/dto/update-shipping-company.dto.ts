import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateShippingCompanyDto } from './create-shipping-company.dto';

export class UpdateShippingCompanyDto extends OmitType(CreateShippingCompanyDto,[] as const) {
    _id:string
}
