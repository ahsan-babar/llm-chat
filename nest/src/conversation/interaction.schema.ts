import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type InteractionDocument = Interaction & Document;

@Schema()
export class Interaction{

  @ApiProperty()
  @Prop({ required: true })
  question: string;

  @ApiProperty()
  @Prop()
  context: string;

  @ApiProperty()
  @Prop({ required: true })
  response: string;

  @ApiProperty()
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const InteractionSchema = SchemaFactory.createForClass(Interaction);
