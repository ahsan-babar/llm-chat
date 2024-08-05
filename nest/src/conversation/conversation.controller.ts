import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { Conversation } from './conversation.schema';
import { Interaction } from './interaction.schema';

import { PostQueryDto, PostQueryResponseDto } from './dto/conversation.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('LLM Conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly ConversationService: ConversationService) { }

  @Post('/query')
  @ApiOkResponse({ type: PostQueryResponseDto })
  async query(@Body() body: PostQueryDto): Promise<PostQueryResponseDto> {
    return this.ConversationService.sendQuery(body.llm, body.question, body.conversationId);
  }

  @Get()
  @ApiQuery({ name: 'conversationId', required: false })
  @ApiOkResponse({ type: Conversation })
  async findAll(@Query('conversationId') conversationId?: string): Promise<Conversation> {
    return this.ConversationService.getConversationHistory(conversationId);
  }

  @Get(':id')
  @ApiOkResponse({ type: Interaction })
  async findOne(@Param('id') id: string): Promise<Interaction> {
    return this.ConversationService.getInteractionById(id);
  }
}
