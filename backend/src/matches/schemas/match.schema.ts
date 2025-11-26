import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MatchDocument = Match & Document;

@Schema({ timestamps: true })
export class Match {
  @ApiProperty({ description: 'ID del equipo local' })
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  homeTeamId: Types.ObjectId;

  @ApiProperty({ description: 'ID del equipo visitante' })
  @Prop({ type: Types.ObjectId, ref: 'Team', required: true })
  awayTeamId: Types.ObjectId;

  @ApiProperty({ description: 'ID de la liga', example: 'laliga' })
  @Prop({ required: true, index: true })
  leagueId: string;

  @ApiProperty({ description: 'Fecha y hora del partido' })
  @Prop({ required: true, index: true })
  matchDate: Date;

  @ApiProperty({ description: 'Estado del partido', example: 'scheduled' })
  @Prop({ enum: ['scheduled', 'live', 'finished', 'postponed'], default: 'scheduled' })
  status: string;

  @ApiProperty({ description: 'Goles equipo local', example: 3 })
  @Prop({ default: null })
  homeScore: number;

  @ApiProperty({ description: 'Goles equipo visitante', example: 1 })
  @Prop({ default: null })
  awayScore: number;

  @ApiProperty({ description: 'Jornada', example: 15 })
  @Prop()
  matchday: number;

  @ApiProperty({ description: 'Estadio' })
  @Prop()
  venue: string;

  @ApiProperty({ description: 'Árbitro' })
  @Prop()
  referee: string;
}

export const MatchSchema = SchemaFactory.createForClass(Match);
MatchSchema.index({ matchDate: 1, status: 1 });
