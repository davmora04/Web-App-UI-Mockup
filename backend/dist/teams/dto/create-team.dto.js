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
exports.CreateTeamDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTeamDto {
}
exports.CreateTeamDto = CreateTeamDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre del equipo', example: 'Real Madrid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Logo del equipo (emoji o URL)', example: '⚪' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "logo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la liga', example: 'laliga' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "leagueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Temporada', example: '2024-2025' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "season", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Ciudad', example: 'Madrid' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Estadio', example: 'Santiago Bernabéu' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "stadium", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Año de fundación', example: 1902 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1800),
    (0, class_validator_1.Max)(2024),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "founded", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Entrenador', example: 'Carlo Ancelotti' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "coach", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Posición en la tabla', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Puntos', example: 45 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Partidos jugados', example: 15 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "played", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Partidos ganados', example: 14 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "won", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Partidos empatados', example: 3 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "drawn", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Partidos perdidos', example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "lost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Goles a favor', example: 42 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "goalsFor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Goles en contra', example: 15 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "goalsAgainst", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Diferencia de goles', example: 27 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateTeamDto.prototype, "goalDifference", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Racha actual', example: 'WWWDW' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateTeamDto.prototype, "form", void 0);
//# sourceMappingURL=create-team.dto.js.map