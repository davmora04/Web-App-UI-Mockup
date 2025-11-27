import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({ description: 'Nombre del equipo', example: 'Real Madrid' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Logo del equipo (emoji o URL)', example: '⚪' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  logo: string;

  @ApiProperty({ description: 'ID de la liga', example: 'laliga' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  leagueId: string;

  @ApiProperty({ description: 'Temporada', example: '2024-2025' })
  @IsString()
  @IsNotEmpty()
  season: string;

  @ApiPropertyOptional({ description: 'Ciudad', example: 'Madrid' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ description: 'Estadio', example: 'Santiago Bernabéu' })
  @IsString()
  @IsOptional()
  stadium?: string;

  @ApiPropertyOptional({ description: 'Año de fundación', example: 1902 })
  @IsInt()
  @Min(1800)
  @Max(2024)
  @IsOptional()
  founded?: number;

  @ApiPropertyOptional({ description: 'Entrenador', example: 'Carlo Ancelotti' })
  @IsString()
  @IsOptional()
  coach?: string;

  @ApiPropertyOptional({ description: 'Posición en la tabla', example: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  position?: number;

  @ApiPropertyOptional({ description: 'Puntos', example: 45 })
  @IsInt()
  @Min(0)
  @IsOptional()
  points?: number;

  @ApiPropertyOptional({ description: 'Partidos jugados', example: 15 })
  @IsInt()
  @Min(0)
  @IsOptional()
  played?: number;

  @ApiPropertyOptional({ description: 'Partidos ganados', example: 14 })
  @IsInt()
  @Min(0)
  @IsOptional()
  won?: number;

  @ApiPropertyOptional({ description: 'Partidos empatados', example: 3 })
  @IsInt()
  @Min(0)
  @IsOptional()
  drawn?: number;

  @ApiPropertyOptional({ description: 'Partidos perdidos', example: 1 })
  @IsInt()
  @Min(0)
  @IsOptional()
  lost?: number;

  @ApiPropertyOptional({ description: 'Goles a favor', example: 42 })
  @IsInt()
  @Min(0)
  @IsOptional()
  goalsFor?: number;

  @ApiPropertyOptional({ description: 'Goles en contra', example: 15 })
  @IsInt()
  @Min(0)
  @IsOptional()
  goalsAgainst?: number;

  @ApiPropertyOptional({ description: 'Diferencia de goles', example: 27 })
  @IsInt()
  @IsOptional()
  goalDifference?: number;

  @ApiPropertyOptional({ description: 'Racha actual', example: 'WWWDW' })
  @IsString()
  @IsOptional()
  form?: string;
}
