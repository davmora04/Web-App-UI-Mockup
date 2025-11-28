import { FavoritesService } from './favorites.service';
export declare class FavoritesController {
    private readonly favoritesService;
    constructor(favoritesService: FavoritesService);
    getFavorites(userId: string): Promise<import("./schemas/favorite.schema").Favorite>;
    addTeam(userId: string, teamId: string): Promise<import("./schemas/favorite.schema").Favorite>;
    removeTeam(userId: string, teamId: string): Promise<import("./schemas/favorite.schema").Favorite>;
    addPlayer(userId: string, playerId: string): Promise<import("./schemas/favorite.schema").Favorite>;
    removePlayer(userId: string, playerId: string): Promise<import("./schemas/favorite.schema").Favorite>;
}
