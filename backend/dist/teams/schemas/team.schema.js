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
exports.TeamSchema = exports.Team = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
let Team = class Team {
};
exports.Team = Team;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del equipo', example: 'Real Madrid' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Team.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo del equipo', example: '⚪' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Team.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la liga', example: 'laliga' }),
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Team.prototype, "leagueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Temporada', example: '2024-2025' }),
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Team.prototype, "season", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Ciudad del equipo', example: 'Madrid' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Team.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Estadio', example: 'Santiago Bernabéu' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Team.prototype, "stadium", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Año de fundación', example: 1902 }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Team.prototype, "founded", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Entrenador', example: 'Carlo Ancelotti' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Team.prototype, "coach", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Posición en la tabla', example: 1 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Puntos', example: 45 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Partidos jugados', example: 15 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "played", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Partidos ganados', example: 14 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "won", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Partidos empatados', example: 3 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "drawn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Partidos perdidos', example: 1 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "lost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Goles a favor', example: 42 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "goalsFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Goles en contra', example: 15 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "goalsAgainst", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Diferencia de goles', example: 27 }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Team.prototype, "goalDifference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Racha actual', example: 'WWWDW' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Team.prototype, "form", void 0);
exports.Team = Team = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Team);
exports.TeamSchema = mongoose_1.SchemaFactory.createForClass(Team);
exports.TeamSchema.index({ leagueId: 1, season: 1 });
exports.TeamSchema.index({ points: -1, goalDifference: -1 });
//# sourceMappingURL=team.schema.js.map