import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

/**
 * Middleware personalizado: Request ID
 * 
 * Propósito: Asignar un ID único a cada petición para trazabilidad
 * de logs y debugging de flujos complejos.
 * 
 * El requestId se puede extraer con el decorador @RequestId()
 * 
 * Usado en: Todas las rutas de la API (configurado en AppModule)
 */
@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Generar o usar requestId existente del header
    const requestId = req.get('x-request-id') || uuidv4();
    
    // Adjuntar al request para uso posterior
    req['requestId'] = requestId;
    
    // Añadir al response header
    res.setHeader('x-request-id', requestId);
    
    next();
  }
}
