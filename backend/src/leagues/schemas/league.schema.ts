import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeagueDocument = League & Document;

@Schema({ timestamps: true })
export class League {
  @Prop({ required: true, unique: true })
  leagueId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  logo: string;

  @Prop({ required: true })
  season: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: 1 })
  currentMatchday: number;

  @Prop()
  totalMatchdays: number;
}

export const LeagueSchema = SchemaFactory.createForClass(League);
