import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post() @ApiOperation({ summary: 'Crear jugador' })
  create(@Body() dto: CreatePlayerDto) { return this.playersService.create(dto); }

  @Get() @ApiOperation({ summary: 'Listar jugadores' })
  findAll() { return this.playersService.findAll(); }

  @Get('search') @ApiOperation({ summary: 'Buscar jugadores' })
  search(@Query('q') query: string) { return this.playersService.search(query); }

  @Get('team/:teamId') @ApiOperation({ summary: 'Jugadores de un equipo' })
  findByTeam(@Param('teamId') teamId: string) { return this.playersService.findByTeam(teamId); }

  @Get(':id') @ApiOperation({ summary: 'Detalle de jugador' })
  findOne(@Param('id') id: string) { return this.playersService.findOne(id); }

  @Patch(':id') @ApiOperation({ summary: 'Actualizar jugador' })
  update(@Param('id') id: string, @Body() dto: CreatePlayerDto) {
    return this.playersService.update(id, dto);
  }

  @Delete(':id') @ApiOperation({ summary: 'Eliminar jugador' })
  remove(@Param('id') id: string) { return this.playersService.remove(id); }
}
