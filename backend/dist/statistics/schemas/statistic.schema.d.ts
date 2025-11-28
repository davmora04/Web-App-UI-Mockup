import { Document, Types } from 'mongoose';
export type StatisticDocument = Statistic & Document;
export declare class Statistic {
    playerId: Types.ObjectId;
    teamId: Types.ObjectId;
    season: string;
    leagueId: string;
    matchesPlayed: number;
    minutesPlayed: number;
    goals: number;
    assists: number;
    yellowCards: number;
    redCards: number;
    tackles: number;
    interceptions: number;
    passAccuracy: number;
    rating: number;
}
export declare const StatisticSchema: import("mongoose").Schema<Statistic, import("mongoose").Model<Statistic, any, any, any, Document<unknown, any, Statistic, any, {}> & Statistic & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Statistic, Document<unknown, {}, import("mongoose").FlatRecord<Statistic>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Statistic> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
