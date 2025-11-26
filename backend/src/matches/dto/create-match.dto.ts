import { IsNotEmpty, IsString, IsDate, IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @ApiProperty({ description: 'ID del equipo local' })
  @IsString()
  @IsNotEmpty()
  homeTeamId: string;

  @ApiProperty({ description: 'ID del equipo visitante' })
  @IsString()
  @IsNotEmpty()
  awayTeamId: string;

  @ApiProperty({ description: 'ID de la liga', example: 'laliga' })
  @IsString()
  @IsNotEmpty()
  leagueId: string;

  @ApiProperty({ description: 'Fecha y hora del partido' })
  @IsDate()
  @Type(() => Date)
  matchDate: Date;

  @ApiPropertyOptional({ description: 'Estado', example: 'scheduled' })
  @IsEnum(['scheduled', 'live', 'finished', 'postponed'])
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Goles local' })
  @IsInt()
  @Min(0)
  @IsOptional()
  homeScore?: number;

  @ApiPropertyOptional({ description: 'Goles visitante' })
  @IsInt()
  @Min(0)
  @IsOptional()
  awayScore?: number;

  @ApiPropertyOptional({ description: 'Jornada' })
  @IsInt()
  @Min(1)
  @IsOptional()
  matchday?: number;

  @ApiPropertyOptional({ description: 'Estadio' })
  @IsString()
  @IsOptional()
  venue?: string;

  @ApiPropertyOptional({ description: 'Árbitro' })
  @IsString()
  @IsOptional()
  referee?: string;
}

export class UpdateMatchDto extends CreateMatchDto {}
