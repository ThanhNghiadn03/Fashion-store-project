import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
    @Prop()
    nameCategory: string;

    @Prop()
    descriptionCategory: string;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date
}

export const CategorySchema = SchemaFactory.createForClass(Category);

