import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true })
export class Team {
  @ApiProperty({ description: 'Nombre del equipo', example: 'Real Madrid' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'Logo del equipo', example: '⚪' })
  @Prop({ required: true })
  logo: string;

  @ApiProperty({ description: 'ID de la liga', example: 'laliga' })
  @Prop({ required: true, index: true })
  leagueId: string;

  @ApiProperty({ description: 'Temporada', example: '2024-2025' })
  @Prop({ required: true })
  season: string;

  @ApiProperty({ description: 'Ciudad del equipo', example: 'Madrid' })
  @Prop()
  city: string;

  @ApiProperty({ description: 'Estadio', example: 'Santiago Bernabéu' })
  @Prop()
  stadium: string;

  @ApiProperty({ description: 'Año de fundación', example: 1902 })
  @Prop()
  founded: number;

  @ApiProperty({ description: 'Entrenador', example: 'Carlo Ancelotti' })
  @Prop()
  coach: string;

  // Estadísticas de la tabla
  @ApiProperty({ description: 'Posición en la tabla', example: 1 })
  @Prop({ default: 0 })
  position: number;

  @ApiProperty({ description: 'Puntos', example: 45 })
  @Prop({ default: 0 })
  points: number;

  @ApiProperty({ description: 'Partidos jugados', example: 15 })
  @Prop({ default: 0 })
  played: number;

  @ApiProperty({ description: 'Partidos ganados', example: 14 })
  @Prop({ default: 0 })
  won: number;

  @ApiProperty({ description: 'Partidos empatados', example: 3 })
  @Prop({ default: 0 })
  drawn: number;

  @ApiProperty({ description: 'Partidos perdidos', example: 1 })
  @Prop({ default: 0 })
  lost: number;

  @ApiProperty({ description: 'Goles a favor', example: 42 })
  @Prop({ default: 0 })
  goalsFor: number;

  @ApiProperty({ description: 'Goles en contra', example: 15 })
  @Prop({ default: 0 })
  goalsAgainst: number;

  @ApiProperty({ description: 'Diferencia de goles', example: 27 })
  @Prop({ default: 0 })
  goalDifference: number;

  @ApiProperty({ description: 'Racha actual', example: 'WWWDW' })
  @Prop()
  form: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

// Índices compuestos para mejorar consultas
TeamSchema.index({ leagueId: 1, season: 1 });
TeamSchema.index({ points: -1, goalDifference: -1 });
