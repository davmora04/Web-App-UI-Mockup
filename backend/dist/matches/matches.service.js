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
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const match_schema_1 = require("./schemas/match.schema");
let MatchesService = class MatchesService {
    constructor(matchModel) {
        this.matchModel = matchModel;
    }
    async create(createMatchDto) {
        const createdMatch = new this.matchModel(createMatchDto);
        return createdMatch.save();
    }
    async findAll() {
        return this.matchModel.find().populate('homeTeamId awayTeamId').sort({ matchDate: -1 }).exec();
    }
    async findOne(id) {
        const match = await this.matchModel.findById(id).populate('homeTeamId awayTeamId').exec();
        if (!match)
            throw new common_1.NotFoundException(`Partido con ID "${id}" no encontrado`);
        return match;
    }
    async update(id, updateMatchDto) {
        const match = await this.matchModel.findByIdAndUpdate(id, updateMatchDto, { new: true }).exec();
        if (!match)
            throw new common_1.NotFoundException(`Partido con ID "${id}" no encontrado`);
        return match;
    }
    async remove(id) {
        const result = await this.matchModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException(`Partido con ID "${id}" no encontrado`);
    }
    async getUpcoming(limit = 10) {
        return this.matchModel
            .find({ matchDate: { $gte: new Date() }, status: 'scheduled' })
            .populate('homeTeamId awayTeamId')
            .sort({ matchDate: 1 })
            .limit(limit)
            .exec();
    }
    async getLive() {
        return this.matchModel
            .find({ status: 'live' })
            .populate('homeTeamId awayTeamId')
            .exec();
    }
    async getRecent(limit = 10) {
        return this.matchModel
            .find({ status: 'finished' })
            .populate('homeTeamId awayTeamId')
            .sort({ matchDate: -1 })
            .limit(limit)
            .exec();
    }
    async getByTeam(teamId) {
        return this.matchModel
            .find({
            $or: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
        })
            .populate('homeTeamId awayTeamId')
            .sort({ matchDate: -1 })
            .exec();
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(match_schema_1.Match.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MatchesService);
//# sourceMappingURL=matches.service.js.map