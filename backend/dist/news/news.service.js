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
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const news_schema_1 = require("./schemas/news.schema");
let NewsService = class NewsService {
    constructor(newsModel) {
        this.newsModel = newsModel;
    }
    async create(dto) {
        return new this.newsModel(dto).save();
    }
    async findAll(limit = 20, skip = 0) {
        return this.newsModel.find().sort({ publishedAt: -1 }).limit(limit).skip(skip).populate('relatedTeamIds relatedMatchId').exec();
    }
    async findFeatured() {
        return this.newsModel.find({ featured: true }).sort({ publishedAt: -1 }).limit(5).exec();
    }
    async findBySlug(slug) {
        const news = await this.newsModel.findOne({ slug }).populate('relatedTeamIds relatedMatchId').exec();
        if (!news)
            throw new common_1.NotFoundException(`Noticia con slug "${slug}" no encontrada`);
        await this.newsModel.findByIdAndUpdate(news._id, { $inc: { views: 1 } });
        return news;
    }
    async findByTeam(teamId) {
        return this.newsModel.find({ relatedTeamIds: teamId }).sort({ publishedAt: -1 }).exec();
    }
    async update(id, dto) {
        return this.newsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
    async remove(id) {
        await this.newsModel.findByIdAndDelete(id).exec();
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(news_schema_1.News.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NewsService);
//# sourceMappingURL=news.service.js.map