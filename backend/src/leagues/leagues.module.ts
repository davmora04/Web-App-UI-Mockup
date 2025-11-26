import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { League, LeagueSchema } from './schemas/league.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: League.name, schema: LeagueSchema }])],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}
