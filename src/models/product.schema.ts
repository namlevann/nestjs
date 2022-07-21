import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  image: string[];
  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
