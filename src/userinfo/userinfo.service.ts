import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserInfoDto } from './dto/userinfo.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { AuthExceptions } from 'src/core/constants/auth.constants';

@Injectable()
export class UserinfoService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchUserInfo(id: string) {
    const info = await this.prismaService.userInfo.findUnique({
      where: {
        userId: id,
      },
    });
    if (!info) {
      throw new HttpException(AuthExceptions.USER_DO_NOT_HAVE_INFO, HttpStatus.BAD_REQUEST);
    }
    return info;
  }

  async updateOrCreateUser({ dto, id }: { dto: UserInfoDto; id: string }) {
    const extraInfo = { grade: dto?.grade, yearGroup: dto?.yearGroup };
    return await this.prismaService.userInfo.upsert({
      where: {
        userId: id,
      },
      update: {
        ...dto,
        ...extraInfo,
      },
      create: {
        ...dto,
        user: {
          connect: { id },
        },
        ...extraInfo,
      },
    });
  }

  async deleteUserIndo(userId: string) {
    const deletedUser = await this.prismaService.userInfo.delete({
      where: { userId },
    });
    if (!deletedUser) {
      throw new HttpException(AuthExceptions.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
  }
}
