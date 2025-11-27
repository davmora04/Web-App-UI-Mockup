import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FavoriteDocument = Favorite & Document;

@Schema({ timestamps: true })
export class Favorite {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true }) userId: Types.ObjectId;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Team' }], default: [] }) favoriteTeams: Types.ObjectId[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Player' }], default: [] }) favoritePlayers: Types.ObjectId[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
