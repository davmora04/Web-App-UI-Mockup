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
exports.LeaguesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const league_schema_1 = require("./schemas/league.schema");
let LeaguesService = class LeaguesService {
    constructor(leagueModel) {
        this.leagueModel = leagueModel;
    }
    async create(dto) {
        return new this.leagueModel(dto).save();
    }
    async findAll() {
        return this.leagueModel.find().exec();
    }
    async findOne(leagueId) {
        const league = await this.leagueModel.findOne({ leagueId }).exec();
        if (!league)
            throw new common_1.NotFoundException(`Liga "${leagueId}" no encontrada`);
        return league;
    }
    async update(leagueId, dto) {
        const league = await this.leagueModel.findOneAndUpdate({ leagueId }, dto, { new: true }).exec();
        if (!league)
            throw new common_1.NotFoundException(`Liga "${leagueId}" no encontrada`);
        return league;
    }
    async remove(leagueId) {
        const result = await this.leagueModel.findOneAndDelete({ leagueId }).exec();
        if (!result)
            throw new common_1.NotFoundException(`Liga "${leagueId}" no encontrada`);
    }
};
exports.LeaguesService = LeaguesService;
exports.LeaguesService = LeaguesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(league_schema_1.League.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LeaguesService);
//# sourceMappingURL=leagues.service.js.map