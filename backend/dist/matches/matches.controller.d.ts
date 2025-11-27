import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './schemas/match.schema';
export declare class MatchesController {
    private readonly matchesService;
    constructor(matchesService: MatchesService);
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    findAll(): Promise<Match[]>;
    getUpcoming(limit?: number): Promise<Match[]>;
    getLive(): Promise<Match[]>;
    getRecent(limit?: number): Promise<Match[]>;
    getByTeam(teamId: string): Promise<Match[]>;
    findOne(id: string): Promise<Match>;
    update(id: string, updateMatchDto: CreateMatchDto): Promise<Match>;
    remove(id: string): Promise<void>;
}
