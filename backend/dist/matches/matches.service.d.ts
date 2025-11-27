import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { CreateMatchDto } from './dto/create-match.dto';
export declare class MatchesService {
    private matchModel;
    constructor(matchModel: Model<MatchDocument>);
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    findAll(): Promise<Match[]>;
    findOne(id: string): Promise<Match>;
    update(id: string, updateMatchDto: CreateMatchDto): Promise<Match>;
    remove(id: string): Promise<void>;
    getUpcoming(limit?: number): Promise<Match[]>;
    getLive(): Promise<Match[]>;
    getRecent(limit?: number): Promise<Match[]>;
    getByTeam(teamId: string): Promise<Match[]>;
}
