"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const favorite_schema_1 = require("./schemas/favorite.schema");
let FavoritesService = class FavoritesService {
    constructor(favoriteModel) {
        this.favoriteModel = favoriteModel;
    }
    async getFavorites(userId) {
        let favorites = await this.favoriteModel.findOne({ userId }).populate('favoriteTeams favoritePlayers').exec();
        if (!favorites) {
            favorites = await new this.favoriteModel({ userId }).save();
        }
        return favorites;
    }
    async addTeam(userId, teamId) {
        return this.favoriteModel.findOneAndUpdate({ userId }, { $addToSet: { favoriteTeams: teamId } }, { new: true, upsert: true }).populate('favoriteTeams favoritePlayers').exec();
    }
    async removeTeam(userId, teamId) {
        return this.favoriteModel.findOneAndUpdate({ userId }, { $pull: { favoriteTeams: teamId } }, { new: true }).populate('favoriteTeams favoritePlayers').exec();
    }
    async addPlayer(userId, playerId) {
        return this.favoriteModel.findOneAndUpdate({ userId }, { $addToSet: { favoritePlayers: playerId } }, { new: true, upsert: true }).populate('favoriteTeams favoritePlayers').exec();
    }
    async removePlayer(userId, playerId) {
        return this.favoriteModel.findOneAndUpdate({ userId }, { $pull: { favoritePlayers: playerId } }, { new: true }).populate('favoriteTeams favoritePlayers').exec();
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(favorite_schema_1.Favorite.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map