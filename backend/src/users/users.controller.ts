import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario' })
  register(@Body() dto: RegisterUserDto) {
    return this.usersService.register(dto);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Perfil actual' })
  getProfile(@CurrentUser('sub') userId: string) {
    return this.usersService.findOne(userId);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar perfil' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar cuenta' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
