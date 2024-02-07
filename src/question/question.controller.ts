import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QuastionService } from './question.service';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreateQuastionDto } from './dto/create-question.dto';
import { DeleteQuastionDto } from './dto/delete-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly quastionService: QuastionService) {}

  @Post('/add')
  @UseGuards(AccessTokenGuard)
  async createQuestion(@Body() dto: CreateQuastionDto) {
    return await this.quastionService.createQuestion(dto);
  }

  @Get('/all')
  @UseGuards(AccessTokenGuard)
  async getAllQuestion() {
    return await this.quastionService.getAllQuestions();
  }

  @Delete('/remove')
  @UseGuards(AccessTokenGuard)
  async deleteQuestion(@Query() { id }: DeleteQuastionDto) {
    return await this.quastionService.deleteQuestion(id);
  }
}
