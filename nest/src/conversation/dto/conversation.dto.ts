import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Interaction } from '../interaction.schema';
import { Types } from 'mongoose';
export enum LLM {
  llama2 = 'llama2',
  mistral = 'mistral'
}

export class PostQueryDto {
  @ApiProperty({ enum: LLM })
  @IsNotEmpty()
  llm!: string;

  @ApiProperty()
  @IsNotEmpty()
  question!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  conversationId?: string;
}


export class PostQueryResponseDto {

  @ApiProperty()
  @IsNotEmpty()
  conversationId!: string;

  @ApiProperty({ enum: LLM })
  @IsNotEmpty()
  llm!: string;

  @ApiProperty()
  @IsNotEmpty()
  interaction!: Interaction;
}


export type TObjectId =string | number | Types.ObjectId |  Uint8Array
