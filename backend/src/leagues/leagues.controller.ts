import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';

@ApiTags('leagues')
@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @Post() @ApiOperation({ summary: 'Crear liga' })
  create(@Body() dto: CreateLeagueDto) { return this.leaguesService.create(dto); }

  @Get() @ApiOperation({ summary: 'Listar ligas' })
  findAll() { return this.leaguesService.findAll(); }

  @Get(':leagueId') @ApiOperation({ summary: 'Detalle de liga' })
  findOne(@Param('leagueId') leagueId: string) { return this.leaguesService.findOne(leagueId); }

  @Patch(':leagueId') @ApiOperation({ summary: 'Actualizar liga' })
  update(@Param('leagueId') leagueId: string, @Body() dto: CreateLeagueDto) {
    return this.leaguesService.update(leagueId, dto);
  }

  @Delete(':leagueId') @ApiOperation({ summary: 'Eliminar liga' })
  remove(@Param('leagueId') leagueId: string) { return this.leaguesService.remove(leagueId); }
}
