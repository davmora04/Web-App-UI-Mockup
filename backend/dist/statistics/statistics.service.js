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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const statistic_schema_1 = require("./schemas/statistic.schema");
let StatisticsService = class StatisticsService {
    constructor(statisticModel) {
        this.statisticModel = statisticModel;
    }
    async create(dto) {
        return new this.statisticModel(dto).save();
    }
    async findByPlayer(playerId) {
        return this.statisticModel.find({ playerId }).populate('playerId teamId').exec();
    }
    async findByTeam(teamId, season) {
        const filter = { teamId };
        if (season)
            filter.season = season;
        return this.statisticModel.find(filter).populate('playerId teamId').exec();
    }
    async getTopScorers(leagueId, season, limit = 10) {
        return this.statisticModel
            .find({ leagueId, season })
            .sort({ goals: -1 })
            .limit(limit)
            .populate('playerId teamId')
            .exec();
    }
    async getTopAssisters(leagueId, season, limit = 10) {
        return this.statisticModel
            .find({ leagueId, season })
            .sort({ assists: -1 })
            .limit(limit)
            .populate('playerId teamId')
            .exec();
    }
    async update(id, dto) {
        return this.statisticModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async remove(id) {
        await this.statisticModel.findByIdAndDelete(id).exec();
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(statistic_schema_1.Statistic.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map