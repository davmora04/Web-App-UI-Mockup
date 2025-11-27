import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const createdTeam = new this.teamModel(createTeamDto);
    return createdTeam.save();
  }

  async findAll(leagueId?: string, season?: string): Promise<Team[]> {
    const filter: any = {};
    if (leagueId) filter.leagueId = leagueId;
    if (season) filter.season = season;

    return this.teamModel.find(filter).sort({ position: 1 }).exec();
  }

  async findOne(id: string): Promise<Team> {
    const team = await this.teamModel.findById(id).exec();
    if (!team) {
      throw new NotFoundException(`Equipo con ID "${id}" no encontrado`);
    }
    return team;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamModel
      .findByIdAndUpdate(id, updateTeamDto, { new: true })
      .exec();
    
    if (!team) {
      throw new NotFoundException(`Equipo con ID "${id}" no encontrado`);
    }
    return team;
  }

  async remove(id: string): Promise<void> {
    const result = await this.teamModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Equipo con ID "${id}" no encontrado`);
    }
  }

  async getStandings(leagueId: string, season?: string): Promise<Team[]> {
    const filter: any = { leagueId };
    if (season) filter.season = season;

    return this.teamModel
      .find(filter)
      .sort({ points: -1, goalDifference: -1, goalsFor: -1 })
      .exec();
  }

  async search(query: string): Promise<Team[]> {
    return this.teamModel
      .find({
        name: { $regex: query, $options: 'i' },
      })
      .limit(10)
      .exec();
  }
}
