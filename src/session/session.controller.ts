import { Body, Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { RoleGuard } from 'src/core/guards/user-role.guard';
import { Role } from '@prisma/client';
import { CreateSessionDto } from './dto/create-session.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';
import { QueryParamsDto } from 'src/core/dto/query-param.dto';
import { DeleteSessionDto } from './dto/delete-session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/create')
  @UseGuards(RoleGuard([Role.DOCTOR]))
  @UseGuards(AccessTokenGuard)
  async getProfile(@Req() { user }: RequestWithUser, @Body() dto: CreateSessionDto) {
    return await this.sessionService.createSession(user.id, dto);
  }

  @Get('/all-sessions')
  @UseGuards(AccessTokenGuard)
  async getAllSessions(@Query() query: QueryParamsDto) {
    return await this.sessionService.fetchSessions(query);
  }

  @Delete('/delete')
  @UseGuards(RoleGuard([Role.DOCTOR, Role.ADMIN]))
  async deleteSession(@Query() { id }: DeleteSessionDto) {
    await this.sessionService.removeSession(id);
    return { status: 'ok' };
  }
}
