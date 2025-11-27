import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Middleware
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';

// Modules
import { TeamsModule } from './teams/teams.module';
import { MatchesModule } from './matches/matches.module';
import { LeaguesModule } from './leagues/leagues.module';
import { UsersModule } from './users/users.module';
import { PlayersModule } from './players/players.module';
import { NewsModule } from './news/news.module';
import { FavoritesModule } from './favorites/favorites.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    // Global Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // MongoDB Connection
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/statfut'),

    // Feature Modules
    TeamsModule,
    MatchesModule,
    LeaguesModule,
    UsersModule,
    PlayersModule,
    NewsModule,
    FavoritesModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware, LoggingMiddleware)
      .forRoutes('*');
  }
}
