import { IsString, IsNotEmpty, IsEnum, IsInt, IsOptional, IsDate, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreatePlayerDto {
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiPropertyOptional() @IsString() @IsOptional() firstName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() lastName?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() photo?: string;
  @ApiProperty() @IsString() @IsNotEmpty() nationality: string;
  @ApiPropertyOptional() @IsDate() @Type(() => Date) @IsOptional() dateOfBirth?: Date;
  @ApiProperty() @IsEnum(['GK', 'DEF', 'MID', 'FWD']) position: string;
  @ApiPropertyOptional() @IsInt() @Min(1) @IsOptional() jerseyNumber?: number;
  @ApiProperty() @IsString() @IsNotEmpty() teamId: string;
  @ApiPropertyOptional() @IsInt() @Min(100) @IsOptional() height?: number;
  @ApiPropertyOptional() @IsInt() @Min(40) @IsOptional() weight?: number;
  @ApiPropertyOptional() @IsEnum(['left', 'right', 'both']) @IsOptional() preferredFoot?: string;
  @ApiPropertyOptional() @IsInt() @Min(0) @IsOptional() marketValue?: number;
}

export class UpdatePlayerDto extends CreatePlayerDto {}
