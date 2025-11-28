import { Document } from 'mongoose';
export type LeagueDocument = League & Document;
export declare class League {
    leagueId: string;
    name: string;
    country: string;
    logo: string;
    season: string;
    startDate: Date;
    endDate: Date;
    currentMatchday: number;
    totalMatchdays: number;
}
export declare const LeagueSchema: import("mongoose").Schema<League, import("mongoose").Model<League, any, any, any, Document<unknown, any, League, any, {}> & League & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, League, Document<unknown, {}, import("mongoose").FlatRecord<League>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<League> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
