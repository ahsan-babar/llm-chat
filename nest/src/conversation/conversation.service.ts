import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, } from 'mongoose';
import {  Conversation, ConversationDocument } from './conversation.schema';
import { Interaction, InteractionDocument} from './interaction.schema';

import { PostQueryResponseDto, TObjectId } from './dto/conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    @InjectModel(Conversation.name) private ConversationModel: Model<Conversation>,
    private httpService: HttpService,
  ) { }

  async sendQuery(llm: string, question: string, conversationId?: TObjectId): Promise<PostQueryResponseDto> {
    let context = '';
    let conversation;
    if (conversationId) {
      const history = await this.getConversationHistory(conversationId);
  
      if (history?.interactions?.length) {
        context = history.interactions.map(i => i.question + '\n' + i.response + '\n').join('');
      } else {
        throw new Error('No conversation found against the provided conversationId');
      }
  
      // Send query to the Python program
      const response = await this.httpService.post(process.env.LLM_SERVER_URL+'/query', { llm, context, question }).toPromise();
  
      conversation = await this.ConversationModel.findByIdAndUpdate(new Types.ObjectId(conversationId),
        {
          $push: {
            interactions: {
              $each: [{ question, response: response.data, context } as InteractionDocument],
              $position: 0
            }
          }
        }, { new: true, lean: true }
      );
  
    } else {
      // Send query to the Python program
      const response = await this.httpService.post(process.env.LLM_SERVER_URL+'/query', { llm, context, question }).toPromise();
  
      // Save the Interaction to the database
      conversation = new this.ConversationModel({
        llm,
        interactions: [{ question, response: response.data, context } as InteractionDocument]
      });
  
      await conversation.save();
    }
  
    return {
      conversationId: conversation._id.toString(),
      llm,
      interaction: conversation.interactions.pop()
    }
  }

  async getConversationHistory(conversationId: TObjectId): Promise<Conversation> {
    const query = { _id: new Types.ObjectId(conversationId) }
    return await this.ConversationModel.findOne(query, { interactions: 1 }).sort({ 'interactions.createdAt': -1 })
  }
  async getInteractionById(id: string): Promise<Interaction> {
    const conversation = await this.ConversationModel.findOne({ 'interactions': { $elemMatch: { '_id': new Types.ObjectId(id) } } });
    console.log(conversation, '---', new Types.ObjectId(id))
    if (conversation === null) {
      throw new Error('No interaction found against the provided id');
    }
    const { interactions = [] } = conversation
    return interactions.pop();
  }
}
