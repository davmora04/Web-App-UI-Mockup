import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './schemas/match.schema';

@ApiTags('matches')
@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un partido' })
  create(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchesService.create(createMatchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los partidos' })
  findAll(): Promise<Match[]> {
    return this.matchesService.findAll();
  }

  @Get('upcoming')
  @ApiOperation({ summary: 'Próximos partidos' })
  getUpcoming(@Query('limit') limit?: number): Promise<Match[]> {
    return this.matchesService.getUpcoming(limit);
  }

  @Get('live')
  @ApiOperation({ summary: 'Partidos en vivo' })
  getLive(): Promise<Match[]> {
    return this.matchesService.getLive();
  }

  @Get('recent')
  @ApiOperation({ summary: 'Partidos recientes' })
  getRecent(@Query('limit') limit?: number): Promise<Match[]> {
    return this.matchesService.getRecent(limit);
  }

  @Get('team/:teamId')
  @ApiOperation({ summary: 'Partidos de un equipo' })
  getByTeam(@Param('teamId') teamId: string): Promise<Match[]> {
    return this.matchesService.getByTeam(teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalle de un partido' })
  findOne(@Param('id') id: string): Promise<Match> {
    return this.matchesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un partido' })
  update(@Param('id') id: string, @Body() updateMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un partido' })
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(id);
  }
}
