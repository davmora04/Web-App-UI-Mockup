import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';
import { CreatePlayerDto } from './dto/create-player.dto';

@Injectable()
export class PlayersService {
  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async create(dto: CreatePlayerDto): Promise<Player> {
    return new this.playerModel(dto).save();
  }

  async findAll(): Promise<Player[]> {
    return this.playerModel.find().populate('teamId').exec();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerModel.findById(id).populate('teamId').exec();
    if (!player) throw new NotFoundException(`Jugador con ID "${id}" no encontrado`);
    return player;
  }

  async findByTeam(teamId: string): Promise<Player[]> {
    return this.playerModel.find({ teamId }).populate('teamId').exec();
  }

  async search(query: string): Promise<Player[]> {
    return this.playerModel.find({ name: { $regex: query, $options: 'i' } }).limit(10).exec();
  }

  async update(id: string, dto: CreatePlayerDto): Promise<Player> {
    const player = await this.playerModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!player) throw new NotFoundException(`Jugador con ID "${id}" no encontrado`);
    return player;
  }

  async remove(id: string): Promise<void> {
    const result = await this.playerModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Jugador con ID "${id}" no encontrado`);
  }
}
