import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from './schemas/match.schema';
import { CreateMatchDto } from './dto/create-match.dto';

@Injectable()
export class MatchesService {
  constructor(@InjectModel(Match.name) private matchModel: Model<MatchDocument>) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const createdMatch = new this.matchModel(createMatchDto);
    return createdMatch.save();
  }

  async findAll(): Promise<Match[]> {
    return this.matchModel.find().populate('homeTeamId awayTeamId').sort({ matchDate: -1 }).exec();
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchModel.findById(id).populate('homeTeamId awayTeamId').exec();
    if (!match) throw new NotFoundException(`Partido con ID "${id}" no encontrado`);
    return match;
  }

  async update(id: string, updateMatchDto: CreateMatchDto): Promise<Match> {
    const match = await this.matchModel.findByIdAndUpdate(id, updateMatchDto, { new: true }).exec();
    if (!match) throw new NotFoundException(`Partido con ID "${id}" no encontrado`);
    return match;
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Partido con ID "${id}" no encontrado`);
  }

  async getUpcoming(limit: number = 10): Promise<Match[]> {
    return this.matchModel
      .find({ matchDate: { $gte: new Date() }, status: 'scheduled' })
      .populate('homeTeamId awayTeamId')
      .sort({ matchDate: 1 })
      .limit(limit)
      .exec();
  }

  async getLive(): Promise<Match[]> {
    return this.matchModel
      .find({ status: 'live' })
      .populate('homeTeamId awayTeamId')
      .exec();
  }

  async getRecent(limit: number = 10): Promise<Match[]> {
    return this.matchModel
      .find({ status: 'finished' })
      .populate('homeTeamId awayTeamId')
      .sort({ matchDate: -1 })
      .limit(limit)
      .exec();
  }

  async getByTeam(teamId: string): Promise<Match[]> {
    return this.matchModel
      .find({
        $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      })
      .populate('homeTeamId awayTeamId')
      .sort({ matchDate: -1 })
      .exec();
  }
}
