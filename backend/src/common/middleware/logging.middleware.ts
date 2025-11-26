import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware personalizado: Logging de todas las peticiones HTTP
 * 
 * Propósito: Registrar información de cada request/response para debugging
 * y monitoreo del sistema.
 * 
 * Usado en: Todas las rutas de la API (configurado en AppModule)
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || '';
    const requestId = req['requestId'] || 'no-id';

    // Log del inicio de la petición
    this.logger.log(
      `[${requestId}] ${method} ${originalUrl} - ${ip} - ${userAgent}`
    );

    const startTime = Date.now();

    // Interceptar el finish del response
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        `[${requestId}] ${method} ${originalUrl} ${statusCode} ${contentLength || 0}bytes - ${responseTime}ms`
      );
    });

    next();
  }
}
