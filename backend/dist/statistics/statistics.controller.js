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
exports.StatisticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const statistics_service_1 = require("./statistics.service");
const create_statistic_dto_1 = require("./dto/create-statistic.dto");
let StatisticsController = class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    create(dto) { return this.statisticsService.create(dto); }
    findByPlayer(playerId) {
        return this.statisticsService.findByPlayer(playerId);
    }
    findByTeam(teamId, season) {
        return this.statisticsService.findByTeam(teamId, season);
    }
    getTopScorers(leagueId, season, limit) {
        return this.statisticsService.getTopScorers(leagueId, season, limit);
    }
    getTopAssisters(leagueId, season, limit) {
        return this.statisticsService.getTopAssisters(leagueId, season, limit);
    }
    update(id, dto) {
        return this.statisticsService.update(id, dto);
    }
    remove(id) { return this.statisticsService.remove(id); }
};
exports.StatisticsController = StatisticsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear estadística' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_statistic_dto_1.CreateStatisticDto]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('player/:playerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Estadísticas de jugador' }),
    __param(0, (0, common_1.Param)('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "findByPlayer", null);
__decorate([
    (0, common_1.Get)('team/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Estadísticas de equipo' }),
    __param(0, (0, common_1.Param)('teamId')),
    __param(1, (0, common_1.Query)('season')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "findByTeam", null);
__decorate([
    (0, common_1.Get)('top-scorers'),
    (0, swagger_1.ApiOperation)({ summary: 'Máximos goleadores' }),
    __param(0, (0, common_1.Query)('leagueId')),
    __param(1, (0, common_1.Query)('season')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "getTopScorers", null);
__decorate([
    (0, common_1.Get)('top-assisters'),
    (0, swagger_1.ApiOperation)({ summary: 'Máximos asistidores' }),
    __param(0, (0, common_1.Query)('leagueId')),
    __param(1, (0, common_1.Query)('season')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "getTopAssisters", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar estadística' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_statistic_dto_1.CreateStatisticDto]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar estadística' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StatisticsController.prototype, "remove", null);
exports.StatisticsController = StatisticsController = __decorate([
    (0, swagger_1.ApiTags)('statistics'),
    (0, common_1.Controller)('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
//# sourceMappingURL=statistics.controller.js.map