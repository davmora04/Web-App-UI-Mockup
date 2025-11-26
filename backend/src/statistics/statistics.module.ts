import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { Statistic, StatisticSchema } from './schemas/statistic.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Statistic.name, schema: StatisticSchema }])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
