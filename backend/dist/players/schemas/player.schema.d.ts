import { Document, Types } from 'mongoose';
export type PlayerDocument = Player & Document;
export declare class Player {
    name: string;
    firstName: string;
    lastName: string;
    photo: string;
    nationality: string;
    dateOfBirth: Date;
    position: string;
    jerseyNumber: number;
    teamId: Types.ObjectId;
    height: number;
    weight: number;
    preferredFoot: string;
    marketValue: number;
}
export declare const PlayerSchema: import("mongoose").Schema<Player, import("mongoose").Model<Player, any, any, any, Document<unknown, any, Player, any, {}> & Player & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Player, Document<unknown, {}, import("mongoose").FlatRecord<Player>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Player> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
