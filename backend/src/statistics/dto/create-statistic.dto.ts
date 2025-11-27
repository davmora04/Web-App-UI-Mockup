import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStatisticDto {
  @ApiProperty() @IsString() @IsNotEmpty() playerId: string;
  @ApiProperty() @IsString() @IsNotEmpty() teamId: string;
  @ApiProperty() @IsString() @IsNotEmpty() season: string;
  @ApiProperty() @IsString() @IsNotEmpty() leagueId: string;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() matchesPlayed?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() minutesPlayed?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() goals?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() assists?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() yellowCards?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() redCards?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() tackles?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() interceptions?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() passAccuracy?: number;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() rating?: number;
}

export class UpdateStatisticDto extends CreateStatisticDto {}
