import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './schemas/team.schema';
import { RequestId } from '../common/decorators/request-id.decorator';

@ApiTags('teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo equipo' })
  @ApiResponse({ status: 201, description: 'Equipo creado', type: Team })
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team> {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los equipos' })
  @ApiQuery({ name: 'leagueId', required: false })
  @ApiQuery({ name: 'season', required: false })
  @ApiResponse({ status: 200, description: 'Lista de equipos', type: [Team] })
  findAll(
    @Query('leagueId') leagueId?: string,
    @Query('season') season?: string,
    @RequestId() requestId?: string,
  ): Promise<Team[]> {
    return this.teamsService.findAll(leagueId, season);
  }

  @Get('search')
  @ApiOperation({ summary: 'Buscar equipos por nombre' })
  @ApiQuery({ name: 'q', required: true })
  @ApiResponse({ status: 200, description: 'Resultados de búsqueda', type: [Team] })
  search(@Query('q') query: string): Promise<Team[]> {
    return this.teamsService.search(query);
  }

  @Get('standings/:leagueId')
  @ApiOperation({ summary: 'Obtener tabla de posiciones' })
  @ApiQuery({ name: 'season', required: false })
  @ApiResponse({ status: 200, description: 'Tabla de posiciones', type: [Team] })
  getStandings(
    @Param('leagueId') leagueId: string,
    @Query('season') season?: string,
  ): Promise<Team[]> {
    return this.teamsService.getStandings(leagueId, season);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalle de un equipo' })
  @ApiResponse({ status: 200, description: 'Detalle del equipo', type: Team })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  findOne(@Param('id') id: string): Promise<Team> {
    return this.teamsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un equipo' })
  @ApiResponse({ status: 200, description: 'Equipo actualizado', type: Team })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<Team> {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un equipo' })
  @ApiResponse({ status: 200, description: 'Equipo eliminado' })
  @ApiResponse({ status: 404, description: 'Equipo no encontrado' })
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(id);
  }
}
