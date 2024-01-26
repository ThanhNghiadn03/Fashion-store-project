import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import mongoose, { HydratedDocument } from 'mongoose';

export type EvaluateDocument = HydratedDocument<Evaluate>;

@Schema({ timestamps: true })
export class Evaluate {

    @Prop()
    comment: string;

    @Prop()
    ratePerCustomer: number;

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
    
    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const EvaluateSchema = SchemaFactory.createForClass(Evaluate);



