import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { SlotService } from 'src/slot/slot.service';
import { sessionInfoSelect } from './constants/constants.select';
import { QueryParamsDto } from 'src/core/dto/query-param.dto';
import { AuthExceptions } from 'src/core/constants/auth.constants';
import { SessionStatus } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly slotService: SlotService,
  ) {}

  async createSession(id: string, dto: CreateSessionDto) {
    const { title, departmen, doctorName, location, limit, status, startDate, duration, description } = dto;

    const newSession = await this.prismaService.session.create({
      data: {
        title,
        departmen,
        doctorName,
        description,
        startDate,
        location,
        duration,
        status,
        autor: {
          connect: { id },
        },
      },
    });

    await this.slotService.createSlot(newSession.id, limit);

    return await this.prismaService.session.findUnique({
      where: { id: newSession.id },
      select: {
        ...sessionInfoSelect.sessionInfo,
      },
    });
  }

  async fetchSessions(query: QueryParamsDto) {
    const { skip, take, search, sessionStatus } = query;
    if (!!search) {
      return this.searchSessions(query);
    }
    const sessions = await this.prismaService.session.findMany({
      where: {
        status: {
          in: !!sessionStatus ? [sessionStatus] : [SessionStatus.AVAILABLE, SessionStatus.COMPLETED],
        },
      },
      skip,
      take,
      select: {
        ...sessionInfoSelect.sessionInfo,
      },
    });
    if (!sessions) {
      throw new HttpException(AuthExceptions.SESSIONS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    const totalCount = sessions.length;
    return { totalCount, sessions };
  }

  async searchSessions(query: QueryParamsDto) {
    const { search, take, skip } = query;
    const sessions = await this.prismaService.session.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            departmen: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            doctorName: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            location: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip,
      take,
      select: {
        ...sessionInfoSelect.sessionInfo,
      },
    });
    if (!sessions) {
      throw new HttpException(AuthExceptions.SESSIONS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    const totalCount = sessions.length;

    return { totalCount, sessions };
  }

  async removeSession(id: string) {
    await this.prismaService.session.delete({
      where: {
        id,
      },
    });
  }

  async getSessionById(id: string) {
    const session = await this.prismaService.session.findUnique({
      where: {
        id,
      },
    });
    if (!session) {
      throw new HttpException(AuthExceptions.SESSIONS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return session;
  }
}
