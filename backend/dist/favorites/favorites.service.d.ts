import { Model } from 'mongoose';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
export declare class FavoritesService {
    private favoriteModel;
    constructor(favoriteModel: Model<FavoriteDocument>);
    getFavorites(userId: string): Promise<Favorite>;
    addTeam(userId: string, teamId: string): Promise<Favorite>;
    removeTeam(userId: string, teamId: string): Promise<Favorite>;
    addPlayer(userId: string, playerId: string): Promise<Favorite>;
    removePlayer(userId: string, playerId: string): Promise<Favorite>;
}
