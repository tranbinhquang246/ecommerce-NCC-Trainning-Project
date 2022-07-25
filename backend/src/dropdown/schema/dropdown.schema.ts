import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DropdownDocument = Dropdown & Document;

@Schema()
export class Dropdown {
  @Prop({ type: Array })
  data: [];
}

export const DropdownSchema = SchemaFactory.createForClass(Dropdown);
