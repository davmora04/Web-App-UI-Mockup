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
exports.TeamsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const teams_service_1 = require("./teams.service");
const create_team_dto_1 = require("./dto/create-team.dto");
const update_team_dto_1 = require("./dto/update-team.dto");
const team_schema_1 = require("./schemas/team.schema");
const request_id_decorator_1 = require("../common/decorators/request-id.decorator");
let TeamsController = class TeamsController {
    constructor(teamsService) {
        this.teamsService = teamsService;
    }
    create(createTeamDto) {
        return this.teamsService.create(createTeamDto);
    }
    findAll(leagueId, season, requestId) {
        return this.teamsService.findAll(leagueId, season);
    }
    search(query) {
        return this.teamsService.search(query);
    }
    getStandings(leagueId, season) {
        return this.teamsService.getStandings(leagueId, season);
    }
    findOne(id) {
        return this.teamsService.findOne(id);
    }
    update(id, updateTeamDto) {
        return this.teamsService.update(id, updateTeamDto);
    }
    remove(id) {
        return this.teamsService.remove(id);
    }
};
exports.TeamsController = TeamsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un nuevo equipo' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Equipo creado', type: team_schema_1.Team }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los equipos' }),
    (0, swagger_1.ApiQuery)({ name: 'leagueId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'season', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de equipos', type: [team_schema_1.Team] }),
    __param(0, (0, common_1.Query)('leagueId')),
    __param(1, (0, common_1.Query)('season')),
    __param(2, (0, request_id_decorator_1.RequestId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar equipos por nombre' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultados de búsqueda', type: [team_schema_1.Team] }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('standings/:leagueId'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener tabla de posiciones' }),
    (0, swagger_1.ApiQuery)({ name: 'season', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tabla de posiciones', type: [team_schema_1.Team] }),
    __param(0, (0, common_1.Param)('leagueId')),
    __param(1, (0, common_1.Query)('season')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "getStandings", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener detalle de un equipo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalle del equipo', type: team_schema_1.Team }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipo no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un equipo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Equipo actualizado', type: team_schema_1.Team }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipo no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_team_dto_1.UpdateTeamDto]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un equipo' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Equipo eliminado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipo no encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeamsController.prototype, "remove", null);
exports.TeamsController = TeamsController = __decorate([
    (0, swagger_1.ApiTags)('teams'),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [teams_service_1.TeamsService])
], TeamsController);
//# sourceMappingURL=teams.controller.js.map