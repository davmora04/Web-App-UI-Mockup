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
exports.UpdateMatchDto = exports.CreateMatchDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateMatchDto {
}
exports.CreateMatchDto = CreateMatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del equipo local' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "homeTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID del equipo visitante' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "awayTeamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de la liga', example: 'laliga' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "leagueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Fecha y hora del partido' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], CreateMatchDto.prototype, "matchDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Estado', example: 'scheduled' }),
    (0, class_validator_1.IsEnum)(['scheduled', 'live', 'finished', 'postponed']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Goles local' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMatchDto.prototype, "homeScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Goles visitante' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMatchDto.prototype, "awayScore", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Jornada' }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateMatchDto.prototype, "matchday", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Estadio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "venue", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Árbitro' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMatchDto.prototype, "referee", void 0);
class UpdateMatchDto extends CreateMatchDto {
}
exports.UpdateMatchDto = UpdateMatchDto;
//# sourceMappingURL=create-match.dto.js.map