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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const player_schema_1 = require("./schemas/player.schema");
let PlayersService = class PlayersService {
    constructor(playerModel) {
        this.playerModel = playerModel;
    }
    async create(dto) {
        return new this.playerModel(dto).save();
    }
    async findAll() {
        return this.playerModel.find().populate('teamId').exec();
    }
    async findOne(id) {
        const player = await this.playerModel.findById(id).populate('teamId').exec();
        if (!player)
            throw new common_1.NotFoundException(`Jugador con ID "${id}" no encontrado`);
        return player;
    }
    async findByTeam(teamId) {
        return this.playerModel.find({ teamId }).populate('teamId').exec();
    }
    async search(query) {
        return this.playerModel.find({ name: { $regex: query, $options: 'i' } }).limit(10).exec();
    }
    async update(id, dto) {
        const player = await this.playerModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!player)
            throw new common_1.NotFoundException(`Jugador con ID "${id}" no encontrado`);
        return player;
    }
    async remove(id) {
        const result = await this.playerModel.findByIdAndDelete(id).exec();
        if (!result)
            throw new common_1.NotFoundException(`Jugador con ID "${id}" no encontrado`);
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(player_schema_1.Player.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PlayersService);
//# sourceMappingURL=players.service.js.map