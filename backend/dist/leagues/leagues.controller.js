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
exports.LeaguesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const leagues_service_1 = require("./leagues.service");
const create_league_dto_1 = require("./dto/create-league.dto");
let LeaguesController = class LeaguesController {
    constructor(leaguesService) {
        this.leaguesService = leaguesService;
    }
    create(dto) { return this.leaguesService.create(dto); }
    findAll() { return this.leaguesService.findAll(); }
    findOne(leagueId) { return this.leaguesService.findOne(leagueId); }
    update(leagueId, dto) {
        return this.leaguesService.update(leagueId, dto);
    }
    remove(leagueId) { return this.leaguesService.remove(leagueId); }
};
exports.LeaguesController = LeaguesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crear liga' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_league_dto_1.CreateLeagueDto]),
    __metadata("design:returntype", void 0)
], LeaguesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ligas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LeaguesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':leagueId'),
    (0, swagger_1.ApiOperation)({ summary: 'Detalle de liga' }),
    __param(0, (0, common_1.Param)('leagueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaguesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':leagueId'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar liga' }),
    __param(0, (0, common_1.Param)('leagueId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_league_dto_1.CreateLeagueDto]),
    __metadata("design:returntype", void 0)
], LeaguesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':leagueId'),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar liga' }),
    __param(0, (0, common_1.Param)('leagueId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LeaguesController.prototype, "remove", null);
exports.LeaguesController = LeaguesController = __decorate([
    (0, swagger_1.ApiTags)('leagues'),
    (0, common_1.Controller)('leagues'),
    __metadata("design:paramtypes", [leagues_service_1.LeaguesService])
], LeaguesController);
//# sourceMappingURL=leagues.controller.js.map