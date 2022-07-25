import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  brand: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  mainImg: string;

  @Prop()
  slidesImg: Array<string>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
