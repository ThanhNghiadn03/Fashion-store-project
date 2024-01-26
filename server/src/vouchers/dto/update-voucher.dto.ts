import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateVoucherDto } from './create-voucher.dto';

export class UpdateVoucherDto extends OmitType(CreateVoucherDto, [] as const) {
    _id:string
}
