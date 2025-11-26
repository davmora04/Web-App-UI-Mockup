import { IsString, IsNotEmpty, IsEnum, IsArray, IsOptional, IsInt, Min, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty() @IsString() @IsNotEmpty() title: string;
  @ApiProperty() @IsString() @IsNotEmpty() slug: string;
  @ApiProperty() @IsString() @IsNotEmpty() summary: string;
  @ApiProperty() @IsString() @IsNotEmpty() content: string;
  @ApiPropertyOptional() @IsString() @IsOptional() coverImage?: string;
  @ApiProperty() @IsEnum(['match-report', 'transfer', 'interview', 'analysis']) category: string;
  @ApiPropertyOptional() @IsArray() @IsOptional() tags?: string[];
  @ApiPropertyOptional() @IsArray() @IsOptional() relatedTeamIds?: string[];
  @ApiPropertyOptional() @IsString() @IsOptional() relatedMatchId?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() author?: string;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() featured?: boolean;
}

export class UpdateNewsDto extends CreateNewsDto {}
