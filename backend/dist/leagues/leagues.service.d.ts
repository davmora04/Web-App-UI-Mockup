import { Model } from 'mongoose';
import { League, LeagueDocument } from './schemas/league.schema';
import { CreateLeagueDto } from './dto/create-league.dto';
export declare class LeaguesService {
    private leagueModel;
    constructor(leagueModel: Model<LeagueDocument>);
    create(dto: CreateLeagueDto): Promise<League>;
    findAll(): Promise<League[]>;
    findOne(leagueId: string): Promise<League>;
    update(leagueId: string, dto: CreateLeagueDto): Promise<League>;
    remove(leagueId: string): Promise<void>;
}
