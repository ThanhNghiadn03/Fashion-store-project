import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto extends OmitType(CreateAdminDto, ['password'] as const) {
    _id:string
}
