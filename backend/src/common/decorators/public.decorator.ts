import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para marcar rutas como públicas (sin autenticación)
 * 
 * Uso:
 * ```typescript
 * @Public()
 * @Post('login')
 * login(@Body() loginDto: LoginDto) {
 *   return this.authService.login(loginDto);
 * }
 * ```
 */
export const Public = () => SetMetadata('isPublic', true);
