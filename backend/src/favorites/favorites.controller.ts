import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get('me')
  @ApiOperation({ summary: 'Mis favoritos' })
  getFavorites(@CurrentUser('sub') userId: string) {
    return this.favoritesService.getFavorites(userId);
  }

  @Post('teams/:teamId')
  @ApiOperation({ summary: 'Agregar equipo favorito' })
  addTeam(@CurrentUser('sub') userId: string, @Param('teamId') teamId: string) {
    return this.favoritesService.addTeam(userId, teamId);
  }

  @Delete('teams/:teamId')
  @ApiOperation({ summary: 'Quitar equipo favorito' })
  removeTeam(@CurrentUser('sub') userId: string, @Param('teamId') teamId: string) {
    return this.favoritesService.removeTeam(userId, teamId);
  }

  @Post('players/:playerId')
  @ApiOperation({ summary: 'Agregar jugador favorito' })
  addPlayer(@CurrentUser('sub') userId: string, @Param('playerId') playerId: string) {
    return this.favoritesService.addPlayer(userId, playerId);
  }

  @Delete('players/:playerId')
  @ApiOperation({ summary: 'Quitar jugador favorito' })
  removePlayer(@CurrentUser('sub') userId: string, @Param('playerId') playerId: string) {
    return this.favoritesService.removePlayer(userId, playerId);
  }
}
