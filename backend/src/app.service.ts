import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'StatFut Backend API',
      version: '1.0.0',
    };
  }

  getInfo() {
    return {
      name: 'StatFut Backend',
      description: 'Sistema de estadísticas de fútbol',
      version: '1.0.0',
      modules: [
        'Teams',
        'Matches',
        'Leagues',
        'Users',
        'Players',
        'News',
        'Favorites',
        'Statistics',
      ],
      documentation: '/api/docs',
    };
  }
}
