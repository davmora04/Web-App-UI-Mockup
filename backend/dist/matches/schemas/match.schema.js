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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchSchema = exports.Match = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
let Match = class Match {
};
exports.Match = Match;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del equipo local' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Team', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Match.prototype, "homeTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del equipo visitante' }),
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Team', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Match.prototype, "awayTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la liga', example: 'laliga' }),
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Match.prototype, "leagueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha y hora del partido' }),
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Date)
], Match.prototype, "matchDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estado del partido', example: 'scheduled' }),
    (0, mongoose_1.Prop)({ enum: ['scheduled', 'live', 'finished', 'postponed'], default: 'scheduled' }),
    __metadata("design:type", String)
], Match.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Goles equipo local', example: 3 }),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Number)
], Match.prototype, "homeScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Goles equipo visitante', example: 1 }),
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Number)
], Match.prototype, "awayScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Jornada', example: 15 }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Match.prototype, "matchday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estadio' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Match.prototype, "venue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Árbitro' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Match.prototype, "referee", void 0);
exports.Match = Match = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Match);
exports.MatchSchema = mongoose_1.SchemaFactory.createForClass(Match);
exports.MatchSchema.index({ matchDate: 1, status: 1 });
//# sourceMappingURL=match.schema.js.map