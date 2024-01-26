import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { HydratedDocument } from 'mongoose';

export type ShippingCompanyDocument = HydratedDocument<ShippingCompany>;

@Schema({ timestamps: true })
export class ShippingCompany {

    @Prop()
    nameCompany: string;

    @Prop()
    description: string;

    @Prop()
    nameContactPerson: string;

    @Prop()
    emailContact: string;

    @Prop()
    phoneContact: string;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const ShippingCompanySchema = SchemaFactory.createForClass(ShippingCompany);


