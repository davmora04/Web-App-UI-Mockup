import { Model } from 'mongoose';
import { Statistic, StatisticDocument } from './schemas/statistic.schema';
import { CreateStatisticDto } from './dto/create-statistic.dto';
export declare class StatisticsService {
    private statisticModel;
    constructor(statisticModel: Model<StatisticDocument>);
    create(dto: CreateStatisticDto): Promise<Statistic>;
    findByPlayer(playerId: string): Promise<Statistic[]>;
    findByTeam(teamId: string, season?: string): Promise<Statistic[]>;
    getTopScorers(leagueId: string, season: string, limit?: number): Promise<Statistic[]>;
    getTopAssisters(leagueId: string, season: string, limit?: number): Promise<Statistic[]>;
    update(id: string, dto: CreateStatisticDto): Promise<Statistic>;
    remove(id: string): Promise<void>;
}
