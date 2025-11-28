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
exports.FavoritesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const favorites_service_1 = require("./favorites.service");
const auth_guard_1 = require("../common/guards/auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let FavoritesController = class FavoritesController {
    constructor(favoritesService) {
        this.favoritesService = favoritesService;
    }
    getFavorites(userId) {
        return this.favoritesService.getFavorites(userId);
    }
    addTeam(userId, teamId) {
        return this.favoritesService.addTeam(userId, teamId);
    }
    removeTeam(userId, teamId) {
        return this.favoritesService.removeTeam(userId, teamId);
    }
    addPlayer(userId, playerId) {
        return this.favoritesService.addPlayer(userId, playerId);
    }
    removePlayer(userId, playerId) {
        return this.favoritesService.removePlayer(userId, playerId);
    }
};
exports.FavoritesController = FavoritesController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Mis favoritos' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "getFavorites", null);
__decorate([
    (0, common_1.Post)('teams/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar equipo favorito' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __param(1, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "addTeam", null);
__decorate([
    (0, common_1.Delete)('teams/:teamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Quitar equipo favorito' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __param(1, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "removeTeam", null);
__decorate([
    (0, common_1.Post)('players/:playerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Agregar jugador favorito' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __param(1, (0, common_1.Param)('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "addPlayer", null);
__decorate([
    (0, common_1.Delete)('players/:playerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Quitar jugador favorito' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('sub')),
    __param(1, (0, common_1.Param)('playerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], FavoritesController.prototype, "removePlayer", null);
exports.FavoritesController = FavoritesController = __decorate([
    (0, swagger_1.ApiTags)('favorites'),
    (0, common_1.Controller)('favorites'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [favorites_service_1.FavoritesService])
], FavoritesController);
//# sourceMappingURL=favorites.controller.js.map