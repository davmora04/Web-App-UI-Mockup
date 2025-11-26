import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post() @ApiOperation({ summary: 'Crear estadística' })
  create(@Body() dto: CreateStatisticDto) { return this.statisticsService.create(dto); }

  @Get('player/:playerId') @ApiOperation({ summary: 'Estadísticas de jugador' })
  findByPlayer(@Param('playerId') playerId: string) {
    return this.statisticsService.findByPlayer(playerId);
  }

  @Get('team/:teamId') @ApiOperation({ summary: 'Estadísticas de equipo' })
  findByTeam(@Param('teamId') teamId: string, @Query('season') season?: string) {
    return this.statisticsService.findByTeam(teamId, season);
  }

  @Get('top-scorers') @ApiOperation({ summary: 'Máximos goleadores' })
  getTopScorers(
    @Query('leagueId') leagueId: string,
    @Query('season') season: string,
    @Query('limit') limit?: number
  ) {
    return this.statisticsService.getTopScorers(leagueId, season, limit);
  }

  @Get('top-assisters') @ApiOperation({ summary: 'Máximos asistidores' })
  getTopAssisters(
    @Query('leagueId') leagueId: string,
    @Query('season') season: string,
    @Query('limit') limit?: number
  ) {
    return this.statisticsService.getTopAssisters(leagueId, season, limit);
  }

  @Patch(':id') @ApiOperation({ summary: 'Actualizar estadística' })
  update(@Param('id') id: string, @Body() dto: CreateStatisticDto) {
    return this.statisticsService.update(id, dto);
  }

  @Delete(':id') @ApiOperation({ summary: 'Eliminar estadística' })
  remove(@Param('id') id: string) { return this.statisticsService.remove(id); }
}
