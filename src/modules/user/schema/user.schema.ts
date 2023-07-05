import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  autoIndex: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ required: true, unique: true })
  walletAddress: string;

  @Prop({ default: "", nullable: true })
  name: string;

  @Prop({ default: "", nullable: true })
  email: string;

  @Prop({ default: "", nullable: true })
  twitter: string;

  @Prop({ default: "", nullable: true })
  instagram: string;

  @Prop({ default: "", nullable: true })
  site: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
