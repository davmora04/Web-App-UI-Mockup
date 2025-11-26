import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';

@Injectable()
export class FavoritesService {
  constructor(@InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>) {}

  async getFavorites(userId: string): Promise<Favorite> {
    let favorites = await this.favoriteModel.findOne({ userId }).populate('favoriteTeams favoritePlayers').exec();
    if (!favorites) {
      favorites = await new this.favoriteModel({ userId }).save();
    }
    return favorites;
  }

  async addTeam(userId: string, teamId: string): Promise<Favorite> {
    return this.favoriteModel.findOneAndUpdate(
      { userId },
      { $addToSet: { favoriteTeams: teamId } },
      { new: true, upsert: true }
    ).populate('favoriteTeams favoritePlayers').exec();
  }

  async removeTeam(userId: string, teamId: string): Promise<Favorite> {
    return this.favoriteModel.findOneAndUpdate(
      { userId },
      { $pull: { favoriteTeams: teamId } },
      { new: true }
    ).populate('favoriteTeams favoritePlayers').exec();
  }

  async addPlayer(userId: string, playerId: string): Promise<Favorite> {
    return this.favoriteModel.findOneAndUpdate(
      { userId },
      { $addToSet: { favoritePlayers: playerId } },
      { new: true, upsert: true }
    ).populate('favoriteTeams favoritePlayers').exec();
  }

  async removePlayer(userId: string, playerId: string): Promise<Favorite> {
    return this.favoriteModel.findOneAndUpdate(
      { userId },
      { $pull: { favoritePlayers: playerId } },
      { new: true }
    ).populate('favoriteTeams favoritePlayers').exec();
  }
}
