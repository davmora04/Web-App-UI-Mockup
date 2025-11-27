export declare class CreateNewsDto {
    title: string;
    slug: string;
    summary: string;
    content: string;
    coverImage?: string;
    category: string;
    tags?: string[];
    relatedTeamIds?: string[];
    relatedMatchId?: string;
    author?: string;
    featured?: boolean;
}
export declare class UpdateNewsDto extends CreateNewsDto {
}
