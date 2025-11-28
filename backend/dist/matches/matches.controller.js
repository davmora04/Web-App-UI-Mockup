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
exports.MatchesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const matches_service_1 = require("./matches.service");
const create_match_dto_1 = require("./dto/create-match.dto");
let MatchesController = class MatchesController {
    constructor(matchesService) {
        this.matchesService = matchesService;
    }
    create(createMatchDto) {
        return this.matchesService.create(createMatchDto);
    }
    findAll() {
        return this.matchesService.findAll();
    }
    getUpcoming(limit) {
        return this.matchesService.getUpcoming(limit);
    }
    getLive() {
        return this.matchesService.getLive();
    }
    getRecent(limit) {
        return this.matchesService.getRecent(limit);
    }
    getByTeam(teamId) {
        return this.matchesService.getByTeam(teamId);
    }
    findOne(id) {
        return this.matchesService.findOne(id);
    }
    update(id, updateMatchDto) {
        return this.matchesService.update(id, updateMatchDto);
    }
    remove(id) {
        return this.matchesService.remove(id);
    }
};
exports.MatchesController = MatchesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear un partido' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_match_dto_1.CreateMatchDto]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos los partidos' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('upcoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Próximos partidos' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getUpcoming", null);
__decorate([
    (0, common_1.Get)('live'),
    (0, swagger_1.ApiOperation)({ summary: 'Partidos en vivo' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getLive", null);
__decorate([
    (0, common_1.Get)('recent'),
    (0, swagger_1.ApiOperation)({ summary: 'Partidos recientes' }),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getRecent", null);
__decorate([
    (0, common_1.Get)('team/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Partidos de un equipo' }),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "getByTeam", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de un partido' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar un partido' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_match_dto_1.CreateMatchDto]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar un partido' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchesController.prototype, "remove", null);
exports.MatchesController = MatchesController = __decorate([
    (0, swagger_1.ApiTags)('matches'),
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [matches_service_1.MatchesService])
], MatchesController);
//# sourceMappingURL=matches.controller.js.map