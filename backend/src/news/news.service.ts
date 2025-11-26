import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News, NewsDocument } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async create(dto: CreateNewsDto): Promise<News> {
    return new this.newsModel(dto).save();
  }

  async findAll(limit: number = 20, skip: number = 0): Promise<News[]> {
    return this.newsModel.find().sort({ publishedAt: -1 }).limit(limit).skip(skip).populate('relatedTeamIds relatedMatchId').exec();
  }

  async findFeatured(): Promise<News[]> {
    return this.newsModel.find({ featured: true }).sort({ publishedAt: -1 }).limit(5).exec();
  }

  async findBySlug(slug: string): Promise<News> {
    const news = await this.newsModel.findOne({ slug }).populate('relatedTeamIds relatedMatchId').exec();
    if (!news) throw new NotFoundException(`Noticia con slug "${slug}" no encontrada`);
    await this.newsModel.findByIdAndUpdate(news._id, { $inc: { views: 1 } });
    return news;
  }

  async findByTeam(teamId: string): Promise<News[]> {
    return this.newsModel.find({ relatedTeamIds: teamId }).sort({ publishedAt: -1 }).exec();
  }

  async update(id: string, dto: CreateNewsDto): Promise<News> {
    return this.newsModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.newsModel.findByIdAndDelete(id).exec();
  }
}
