import { LeaguesService } from './leagues.service';
import { CreateLeagueDto } from './dto/create-league.dto';
export declare class LeaguesController {
    private readonly leaguesService;
    constructor(leaguesService: LeaguesService);
    create(dto: CreateLeagueDto): Promise<import("./schemas/league.schema").League>;
    findAll(): Promise<import("./schemas/league.schema").League[]>;
    findOne(leagueId: string): Promise<import("./schemas/league.schema").League>;
    update(leagueId: string, dto: CreateLeagueDto): Promise<import("./schemas/league.schema").League>;
    remove(leagueId: string): Promise<void>;
}
