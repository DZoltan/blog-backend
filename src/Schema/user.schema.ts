import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
