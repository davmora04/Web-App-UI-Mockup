import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador personalizado: @CurrentUser()
 * 
 * Propósito: Extraer el usuario autenticado del request después
 * de pasar por el AuthGuard.
 * 
 * Uso:
 * ```typescript
 * @Get('profile')
 * @UseGuards(AuthGuard)
 * getProfile(@CurrentUser() user: any) {
 *   return { userId: user.sub, email: user.email };
 * }
 * ```
 */
export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
