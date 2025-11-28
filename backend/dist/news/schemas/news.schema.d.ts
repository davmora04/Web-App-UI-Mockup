import { Document, Types } from 'mongoose';
export type NewsDocument = News & Document;
export declare class News {
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    relatedTeamIds: Types.ObjectId[];
    relatedMatchId: Types.ObjectId;
    author: string;
    publishedAt: Date;
    views: number;
    featured: boolean;
}
export declare const NewsSchema: import("mongoose").Schema<News, import("mongoose").Model<News, any, any, any, Document<unknown, any, News, any, {}> & News & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, News, Document<unknown, {}, import("mongoose").FlatRecord<News>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<News> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
