import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post() @ApiOperation({ summary: 'Crear noticia' })
  create(@Body() dto: CreateNewsDto) { return this.newsService.create(dto); }

  @Get() @ApiOperation({ summary: 'Listar noticias' })
  findAll(@Query('limit') limit?: number, @Query('skip') skip?: number) {
    return this.newsService.findAll(limit, skip);
  }

  @Get('featured') @ApiOperation({ summary: 'Noticias destacadas' })
  findFeatured() { return this.newsService.findFeatured(); }

  @Get('team/:teamId') @ApiOperation({ summary: 'Noticias de un equipo' })
  findByTeam(@Param('teamId') teamId: string) { return this.newsService.findByTeam(teamId); }

  @Get(':slug') @ApiOperation({ summary: 'Detalle de noticia' })
  findBySlug(@Param('slug') slug: string) { return this.newsService.findBySlug(slug); }

  @Patch(':id') @ApiOperation({ summary: 'Actualizar noticia' })
  update(@Param('id') id: string, @Body() dto: CreateNewsDto) {
    return this.newsService.update(id, dto);
  }

  @Delete(':id') @ApiOperation({ summary: 'Eliminar noticia' })
  remove(@Param('id') id: string) { return this.newsService.remove(id); }
}
