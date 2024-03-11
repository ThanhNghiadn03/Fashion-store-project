import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends OmitType(CreateCartDto, ['idCustomers','idProduct'] as const ){
    _id: string
}
