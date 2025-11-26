import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schemas/statistic.schema';
import { CreateStatisticDto } from './dto/create-statistic.dto';

/**
 * MÓDULO: Statistics
 * PROPÓSITO: Gestión de estadísticas detalladas de jugadores y equipos
 * RELACIÓN CON FRONTEND: Tablas de estadísticas, goleadores, rankings
 * PROBLEMA QUE RESUELVE: Análisis de rendimiento y comparativas
 */
@Injectable()
export class StatisticsService {
  constructor(@InjectModel(Statistic.name) private statisticModel: Model<StatisticDocument>) {}

  async create(dto: CreateStatisticDto): Promise<Statistic> {
    return new this.statisticModel(dto).save();
  }

  async findByPlayer(playerId: string): Promise<Statistic[]> {
    return this.statisticModel.find({ playerId }).populate('playerId teamId').exec();
  }

  async findByTeam(teamId: string, season?: string): Promise<Statistic[]> {
    const filter: any = { teamId };
    if (season) filter.season = season;
    return this.statisticModel.find(filter).populate('playerId teamId').exec();
  }

  async getTopScorers(leagueId: string, season: string, limit: number = 10): Promise<Statistic[]> {
    return this.statisticModel
      .find({ leagueId, season })
      .sort({ goals: -1 })
      .limit(limit)
      .populate('playerId teamId')
      .exec();
  }

  async getTopAssisters(leagueId: string, season: string, limit: number = 10): Promise<Statistic[]> {
    return this.statisticModel
      .find({ leagueId, season })
      .sort({ assists: -1 })
      .limit(limit)
      .populate('playerId teamId')
      .exec();
  }

  async update(id: string, dto: CreateStatisticDto): Promise<Statistic> {
    return this.statisticModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.statisticModel.findByIdAndDelete(id).exec();
  }
}
