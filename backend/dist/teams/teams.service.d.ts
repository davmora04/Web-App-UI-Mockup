import { Model } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
export declare class TeamsService {
    private teamModel;
    constructor(teamModel: Model<TeamDocument>);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    findAll(leagueId?: string, season?: string): Promise<Team[]>;
    findOne(id: string): Promise<Team>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team>;
    remove(id: string): Promise<void>;
    getStandings(leagueId: string, season?: string): Promise<Team[]>;
    search(query: string): Promise<Team[]>;
}
