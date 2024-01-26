import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import mongoose, { HydratedDocument } from 'mongoose';

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({ timestamps: true })
export class OrderDetail {
    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    }
    )
    idCustomer: mongoose.Types.ObjectId;

    @Prop(
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        }
        )
        idProduct: mongoose.Types.ObjectId;

    @Prop()
    items : [{
        quantity: number,
        price : number,
        imageProduct : string
    }]

    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
    }
    )
    idVoucher: mongoose.Types.ObjectId;

    @Prop()
    totalPrice: number;

    @Prop()
    paymentMethod: string;

    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipping-company',
        required: true,
    }
    )
    idShippingCompany: mongoose.Types.ObjectId;

    @Prop()
    statusDelivery: string;

    @Prop()
    isPaid: {
        image: string,
        confirm: string
    }

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);


