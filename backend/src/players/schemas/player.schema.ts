// PLAYERS MODULE - Complete implementation
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: true })
export class Player {
  @Prop({ required: true }) name: string;
  @Prop() firstName: string;
  @Prop() lastName: string;
  @Prop() photo: string;
  @Prop({ required: true }) nationality: string;
  @Prop() dateOfBirth: Date;
  @Prop({ enum: ['GK', 'DEF', 'MID', 'FWD'], required: true }) position: string;
  @Prop() jerseyNumber: number;
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true, index: true }) teamId: Types.ObjectId;
  @Prop() height: number;
  @Prop() weight: number;
  @Prop({ enum: ['left', 'right', 'both'] }) preferredFoot: string;
  @Prop() marketValue: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
