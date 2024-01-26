import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema({ timestamps: true })
export class Customer {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    phoneNumber: string;

    @Prop()
    password: string;

    @Prop()
    address: 
    [{
        city: string,
        district: string,
        detailAddress: string
    }];

    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
        default: '65a7c9802ef262e85a455c54',
    }
    )
    idRole: mongoose.Types.ObjectId;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

