import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop()
  nameRole: string;
  
  @Prop()
  descriptionRole: string;

  @Prop()
  createdAt: Date

  @Prop()
  updatedAt: Date
}

export const RoleSchema = SchemaFactory.createForClass(Role);
