import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Mongoose } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ timestamps: true })
export class Admin {
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

    @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
        default: '65a7ca112ef262e85a455c56',
    }
    )
    idRole: mongoose.Types.ObjectId;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

