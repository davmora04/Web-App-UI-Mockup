import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { League, LeagueDocument } from './schemas/league.schema';
import { CreateLeagueDto } from './dto/create-league.dto';

@Injectable()
export class LeaguesService {
  constructor(@InjectModel(League.name) private leagueModel: Model<LeagueDocument>) {}

  async create(dto: CreateLeagueDto): Promise<League> {
    return new this.leagueModel(dto).save();
  }

  async findAll(): Promise<League[]> {
    return this.leagueModel.find().exec();
  }

  async findOne(leagueId: string): Promise<League> {
    const league = await this.leagueModel.findOne({ leagueId }).exec();
    if (!league) throw new NotFoundException(`Liga "${leagueId}" no encontrada`);
    return league;
  }

  async update(leagueId: string, dto: CreateLeagueDto): Promise<League> {
    const league = await this.leagueModel.findOneAndUpdate({ leagueId }, dto, { new: true }).exec();
    if (!league) throw new NotFoundException(`Liga "${leagueId}" no encontrada`);
    return league;
  }

  async remove(leagueId: string): Promise<void> {
    const result = await this.leagueModel.findOneAndDelete({ leagueId }).exec();
    if (!result) throw new NotFoundException(`Liga "${leagueId}" no encontrada`);
  }
}
