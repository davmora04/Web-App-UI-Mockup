import { Document, Types } from 'mongoose';
export type MatchDocument = Match & Document;
export declare class Match {
    homeTeamId: Types.ObjectId;
    awayTeamId: Types.ObjectId;
    leagueId: string;
    matchDate: Date;
    status: string;
    homeScore: number;
    awayScore: number;
    matchday: number;
    venue: string;
    referee: string;
}
export declare const MatchSchema: import("mongoose").Schema<Match, import("mongoose").Model<Match, any, any, any, Document<unknown, any, Match, any, {}> & Match & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Match, Document<unknown, {}, import("mongoose").FlatRecord<Match>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Match> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
