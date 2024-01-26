import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
    )
    idProduct: mongoose.Types.ObjectId;

    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    }
    )
    idCustomers: mongoose.Types.ObjectId;

    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }
    )
    idOrder: mongoose.Types.ObjectId;

    @Prop()
    items : [{
        quantity: number,
        price : number,
        imageProduct : string
    }]

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const CartSchema = SchemaFactory.createForClass(Cart);


