import { IsString, IsNotEmpty, IsDate, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLeagueDto {
  @ApiProperty() @IsString() @IsNotEmpty() leagueId: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() country: string;
  @ApiPropertyOptional() @IsString() @IsOptional() logo?: string;
  @ApiProperty() @IsString() @IsNotEmpty() season: string;
  @ApiPropertyOptional() @IsDate() @Type(() => Date) @IsOptional() startDate?: Date;
  @ApiPropertyOptional() @IsDate() @Type(() => Date) @IsOptional() endDate?: Date;
  @ApiPropertyOptional() @IsInt() @Min(1) @IsOptional() currentMatchday?: number;
  @ApiPropertyOptional() @IsInt() @Min(1) @IsOptional() totalMatchdays?: number;
}

export class UpdateLeagueDto extends CreateLeagueDto {}
