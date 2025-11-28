import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
export declare class NewsController {
    private readonly newsService;
    constructor(newsService: NewsService);
    create(dto: CreateNewsDto): Promise<import("./schemas/news.schema").News>;
    findAll(limit?: number, skip?: number): Promise<import("./schemas/news.schema").News[]>;
    findFeatured(): Promise<import("./schemas/news.schema").News[]>;
    findByTeam(teamId: string): Promise<import("./schemas/news.schema").News[]>;
    findBySlug(slug: string): Promise<import("./schemas/news.schema").News>;
    update(id: string, dto: CreateNewsDto): Promise<import("./schemas/news.schema").News>;
    remove(id: string): Promise<void>;
}
