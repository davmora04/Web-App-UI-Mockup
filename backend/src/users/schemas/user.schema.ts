import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true }) username: string;
  @Prop({ required: true, unique: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() avatar: string;
  @Prop({ enum: ['user', 'admin', 'moderator'], default: 'user' }) role: string;
  @Prop({ type: Types.ObjectId, ref: 'Team' }) favoriteTeamId: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
