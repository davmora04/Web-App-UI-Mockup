import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
export declare class StatisticsController {
    private readonly statisticsService;
    constructor(statisticsService: StatisticsService);
    create(dto: CreateStatisticDto): Promise<import("./schemas/statistic.schema").Statistic>;
    findByPlayer(playerId: string): Promise<import("./schemas/statistic.schema").Statistic[]>;
    findByTeam(teamId: string, season?: string): Promise<import("./schemas/statistic.schema").Statistic[]>;
    getTopScorers(leagueId: string, season: string, limit?: number): Promise<import("./schemas/statistic.schema").Statistic[]>;
    getTopAssisters(leagueId: string, season: string, limit?: number): Promise<import("./schemas/statistic.schema").Statistic[]>;
    update(id: string, dto: CreateStatisticDto): Promise<import("./schemas/statistic.schema").Statistic>;
    remove(id: string): Promise<void>;
}
