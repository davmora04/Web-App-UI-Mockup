import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type StatisticDocument = Statistic & Document;

@Schema({ timestamps: true })
export class Statistic {
  @Prop({ type: Types.ObjectId, ref: 'Player', required: true }) playerId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true }) teamId: Types.ObjectId;
  @Prop({ required: true }) season: string;
  @Prop({ required: true }) leagueId: string;
  @Prop({ default: 0 }) matchesPlayed: number;
  @Prop({ default: 0 }) minutesPlayed: number;
  @Prop({ default: 0 }) goals: number;
  @Prop({ default: 0 }) assists: number;
  @Prop({ default: 0 }) yellowCards: number;
  @Prop({ default: 0 }) redCards: number;
  @Prop({ default: 0 }) tackles: number;
  @Prop({ default: 0 }) interceptions: number;
  @Prop({ default: 0 }) passAccuracy: number;
  @Prop({ default: 0 }) rating: number;
}

export const StatisticSchema = SchemaFactory.createForClass(Statistic);
StatisticSchema.index({ playerId: 1, season: 1, leagueId: 1 });
