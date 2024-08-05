import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { LLM } from './dto/conversation.dto';
import { Interaction, InteractionDocument, InteractionSchema } from './interaction.schema';

export type ConversationDocument = Conversation & Document;

@Schema({ timestamps: true })
export class Conversation extends Document {
  @ApiProperty({ enum: LLM })
  @Prop({ required: true })
  llm: string;

  @ApiProperty({ type: Interaction, isArray: true })
  @Prop({ required: true, type: [InteractionSchema], default: [] })
  interactions: InteractionDocument[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
ConversationSchema.index({ 'interactions.createdAt': -1 });