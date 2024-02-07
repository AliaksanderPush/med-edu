import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RoleGuard } from 'src/core/guards/user-role.guard';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackService } from './feedback.service';
import { GetAllfeddbacksDto } from './dto/get-all-feedbacks.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('/create')
  @UseGuards(RoleGuard([Role.STUDENT, Role.ADMIN]))
  @UseGuards(AccessTokenGuard)
  async getProfile(@Req() { user }: RequestWithUser, @Body() dto: CreateFeedbackDto) {
    return await this.feedbackService.createFeedback(user.id, dto);
  }

  @Get('/feedback-all')
  async getAllFeedBacksById(@Query() { sessionId }: GetAllfeddbacksDto) {
    return await this.feedbackService.getAllFeedBacksBySession(sessionId);
  }
}
