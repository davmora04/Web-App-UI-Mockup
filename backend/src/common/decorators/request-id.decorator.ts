import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorador personalizado: @RequestId()
 * 
 * Propósito: Extraer fácilmente el requestId generado por RequestIdMiddleware
 * sin tener que acceder manualmente al objeto request.
 * 
 * Uso:
 * ```typescript
 * @Get()
 * findAll(@RequestId() requestId: string) {
 *   this.logger.log(`Request ${requestId}: fetching all items`);
 *   return this.service.findAll();
 * }
 * ```
 */
export const RequestId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return request['requestId'] || 'unknown';
  },
);
