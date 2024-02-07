import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryParamsDto } from 'src/core/dto/query-param.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { slotsInfoSelect } from './constants/constants.select';
import { SlotStatus } from '@prisma/client';
import { AuthExceptions } from 'src/core/constants/auth.constants';

@Injectable()
export class SlotService {
  constructor(private readonly prismaService: PrismaService) {}

  async createSlot(id: string, limit: number) {
    return await this.prismaService.slot.create({
      data: {
        limit,
        session: {
          connect: { id },
        },
      },
      select: {
        ...slotsInfoSelect.shortResponce,
      },
    });
  }

  async getAllSlots(query: QueryParamsDto) {
    const { skip, take } = query;
    const slots = await this.prismaService.slot.findMany({
      skip,
      take,
      select: {
        ...slotsInfoSelect.fullResponce,
      },
    });
    const totalCount = await this.prismaService.slot.count();

    return { totalCount, slots };
  }

  async removeSlot(id: string) {
    return await this.prismaService.slot.delete({
      where: {
        sessionId: id,
      },
    });
  }

  async bookingSession(id: string, userId: string) {
    await this.checkIncomFeedBack(userId);
    const checkSlot = await this.prismaService.slot.findUnique({
      where: {
        id,
      },
      select: {
        users: true,
        status: true,
      },
    });

    if (checkSlot.status === SlotStatus.NOTACCEPTED) {
      throw new HttpException(AuthExceptions.SLOT_IS_FULL, HttpStatus.BAD_REQUEST);
    }
    const res = checkSlot.users.some((i) => i.id === userId);

    if (res) {
      throw new HttpException(AuthExceptions.ALREDY_SIGNET, HttpStatus.BAD_REQUEST);
    }

    const slot = await this.prismaService.slot.update({
      where: {
        id,
      },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
        count: {
          increment: 1,
        },
      },
    });

    if (slot.count === slot.limit) {
      return await this.prismaService.slot.update({
        where: {
          id,
        },
        data: {
          status: SlotStatus.NOTACCEPTED,
        },
      });
    }

    await this.createincomFeedBack(userId, slot.sessionId);

    return slot;
  }

  async unsubsribe(id: string, userId: string) {
    const mySlot = await this.prismaService.slot.findUnique({
      where: {
        id,
      },
      select: {
        count: true,
        users: true,
      },
    });
    if (!mySlot) {
      throw new HttpException(AuthExceptions.SESSIONS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const res = mySlot.users.some((i) => i.id === userId);
    if (!res) {
      throw new HttpException(AuthExceptions.NOT_SUBSCRIBED, HttpStatus.BAD_REQUEST);
    }

    const slot = await this.prismaService.slot.update({
      where: {
        id,
      },
      data: {
        users: {
          disconnect: {
            id: userId,
          },
        },
        count: {
          decrement: 1,
        },
      },
    });

    if (slot.count < slot.limit) {
      await this.prismaService.slot.update({
        where: {
          id,
        },
        data: {
          status: SlotStatus.ACCEPTED,
        },
      });
    }
    await this.removeIncomFeedBack(userId, slot.sessionId);
    return slot;
  }

  async createincomFeedBack(userId: string, sessionId: string) {
    const session = await this.prismaService.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    await this.prismaService.incompleteFeedback.create({
      data: {
        user: {
          connect: { id: userId },
        },
        expirationDate: session.startDate,
      },
    });
    await this.prismaService.userInfo.update({
      where: {
        userId,
      },
      data: {
        incomeFeedBacks: {
          increment: 1,
        },
      },
    });
  }

  async removeIncomFeedBack(userId: string, sessionId: string) {
    const session = await this.prismaService.session.findUnique({
      where: {
        id: sessionId,
      },
    });

    await this.prismaService.incompleteFeedback.deleteMany({
      where: {
        userId,
        expirationDate: {
          equals: session.startDate,
        },
      },
    });
    await this.prismaService.userInfo.update({
      where: {
        userId,
      },
      data: {
        incomeFeedBacks: {
          decrement: 1,
        },
      },
    });
  }

  async checkIncomFeedBack(userId: string) {
    const currentDate = new Date();

    const incomeFeddBack = await this.prismaService.incompleteFeedback.findFirst({
      where: {
        userId,
        expirationDate: {
          lt: currentDate,
        },
      },
    });
    if (incomeFeddBack) {
      throw new HttpException(AuthExceptions.NOT_SUBSRIBE_NEXT_SESSION, HttpStatus.BAD_REQUEST);
    }
  }
}
