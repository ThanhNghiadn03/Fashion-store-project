import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoucherDocument = HydratedDocument<Voucher>;

@Schema({ timestamps: true })
export class Voucher {
  @Prop()  
  idVoucher: string;

  @Prop()
  typeVoucher: string;

  @Prop()
  discount: number;

  @Prop()
  quantity: number;

  @Prop()
  descriptionVoucher: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const VoucherSchema = SchemaFactory.createForClass(Voucher);

