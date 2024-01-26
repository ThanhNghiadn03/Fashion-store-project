import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends OmitType(CreateCategoryDto, [] as const) {
    _id:string
}
