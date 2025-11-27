// NEWS, FAVORITES, STATISTICS - Complete implementations
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// NEWS SCHEMA
export type NewsDocument = News & Document;

@Schema({ timestamps: true })
export class News {
  @Prop({ required: true }) title: string;
  @Prop({ required: true, unique: true }) slug: string;
  @Prop({ required: true }) summary: string;
  @Prop({ required: true }) content: string;
  @Prop() coverImage: string;
  @Prop({ enum: ['match-report', 'transfer', 'interview', 'analysis'], required: true }) category: string;
  @Prop({ type: [String], default: [] }) tags: string[];
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Team' }], default: [] }) relatedTeamIds: Types.ObjectId[];
  @Prop({ type: Types.ObjectId, ref: 'Match' }) relatedMatchId: Types.ObjectId;
  @Prop() author: string;
  @Prop({ default: () => new Date() }) publishedAt: Date;
  @Prop({ default: 0 }) views: number;
  @Prop({ default: false }) featured: boolean;
}

export const NewsSchema = SchemaFactory.createForClass(News);
NewsSchema.index({ slug: 1 });
NewsSchema.index({ category: 1, publishedAt: -1 });
