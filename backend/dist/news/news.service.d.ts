import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
export declare class NewsService {
    private newsModel;
    constructor(newsModel: Model<NewsDocument>);
    create(dto: CreateNewsDto): Promise<News>;
    findAll(limit?: number, skip?: number): Promise<News[]>;
    findFeatured(): Promise<News[]>;
    findBySlug(slug: string): Promise<News>;
    findByTeam(teamId: string): Promise<News[]>;
    update(id: string, dto: CreateNewsDto): Promise<News>;
    remove(id: string): Promise<void>;
}
