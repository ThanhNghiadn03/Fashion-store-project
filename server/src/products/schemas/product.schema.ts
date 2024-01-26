import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({required: true})
  nameProduct: string;

  @Prop({required: true})
  price: number;

  @Prop({required: true})
  discount: number;

  @Prop()
  descriptionProduct: string;

  @Prop()
  imageProduct: string;

  @Prop()
  rated: number;

  @Prop(
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evaluate',
    }
  )
  idEvaluated: mongoose.Types.ObjectId;

  @Prop()
  quantity: number;

  @Prop(
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }
  )
  idCategory: mongoose.Types.ObjectId;

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product);
