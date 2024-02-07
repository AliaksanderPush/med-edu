import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UserinfoService } from 'src/userinfo/userinfo.service';
import { managerSlotSelect } from './constants/manager-slot.select';
import { AuthExceptions } from 'src/core/constants/auth.constants';
import { ManagerSlotStatus } from '@prisma/client';
import { userSlotSelect } from './constants/users-slot.select';

@Injectable()
export class ManagerSlotService {
  constructor(
    private readonly userService: UserService,
    private readonly userinfoService: UserinfoService,
    private readonly prismaService: PrismaService,
  ) {}
  async createManagerSlots(managerId: string, limit: number) {
    await this.userService.getUserById(managerId);

    const manSlot = await this.prismaService.managerSlot.create({
      data: {
        limit,
        user: {
          connect: {
            id: managerId,
          },
        },
      },
    });
    await this.prismaService.slotUsers.create({
      data: {
        managerSlot: {
          connect: { id: manSlot.id },
        },
      },
    });

    return this.prismaService.managerSlot.findUnique({
      where: { id: manSlot.id },
      select: {
        ...managerSlotSelect.generalInfo,
      },
    });
  }

  async addToManagerSlot(managerId: string, id: string) {
    const manSlot = await this.getManagerSlot(managerId);
    await this.userService.getUserById(id);
    await this.userService.updateInvateStatus(id, ManagerSlotStatus.PENDING);
    return await this.prismaService.slotUsers.update({
      where: {
        managerSlotId: manSlot.id,
      },
      data: {
        users: {
          connect: {
            id,
          },
        },
      },
      select: {
        ...userSlotSelect.generalInfo,
      },
    });
  }

  async deleteFromManagerSlot(managerId: string, id: string) {
    const manSlot = await this.getManagerSlot(managerId);
    await this.userService.getUserById(id);
    await this.userService.updateInvateStatus(id, ManagerSlotStatus.NOTACCEPTED);
    return await this.prismaService.slotUsers.update({
      where: {
        managerSlotId: manSlot.id,
      },
      data: {
        users: {
          disconnect: {
            id,
          },
        },
      },
      select: {
        ...userSlotSelect.generalInfo,
      },
    });
  }

  async getManagerSlot(managerId: string) {
    const manSlot = await this.prismaService.managerSlot.findUnique({
      where: { userId: managerId },
      select: {
        ...managerSlotSelect.generalInfo,
      },
    });
    if (!manSlot) {
      throw new HttpException(AuthExceptions.MANAGER_SLOT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return manSlot;
  }

  async getUsersSlot(managerId: string) {
    const manSlot = await this.getManagerSlot(managerId);
    const userSlot = await this.prismaService.slotUsers.findUnique({
      where: { managerSlotId: manSlot.id },
      select: {
        ...userSlotSelect.generalInfo,
      },
    });
    if (!userSlot) {
      throw new HttpException(AuthExceptions.MANAGER_SLOT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return userSlot;
  }
}
