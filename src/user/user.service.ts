import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ManagerSlotStatus, Role, User, UserStatus, Verification } from '@prisma/client';
import { RegistrDto } from 'src/auth/dto/regisrtration.dto';
import { AuthExceptions } from 'src/core/constants/auth.constants';
import { HelperService } from 'src/helper/helper.service';
import { IJwtTokens } from 'src/tokens/dto/tokens.dto';
import { TokensService } from 'src/tokens/tokens.service';
import { userInfoSelect } from './constants/constants.select';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { hash } from 'bcrypt';
import { userInfoWhere } from './constants/constants.where';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UserinfoService } from 'src/userinfo/userinfo.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryParamsDto } from 'src/core/dto/query-param.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly tokensService: TokensService,
    private readonly prismaService: PrismaService,
    private readonly helperService: HelperService,
    private readonly userinfoService: UserinfoService,
  ) {}

  async getMe(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
      select: {
        ...userInfoSelect.generalInfo,
      },
    });
    if (!user) {
      throw new HttpException(AuthExceptions.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async createNewUser({ dto, candidate }: { dto: RegistrDto; candidate: Verification }): Promise<IJwtTokens> {
    const { email, password } = dto;
    const hashPass = await this.hashdata(password);

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        password: hashPass,
        role: candidate.role,
      },
    });

    const tokens = await this.tokensService.generateTokens(email, newUser.id, newUser.role);
    await this.tokensService.saveToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(AuthExceptions.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException(AuthExceptions.USERS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async getUserByEmailThrow(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new HttpException(AuthExceptions.ALREDY_REGISTERED, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  private async hashdata(data: string) {
    return hash(data, 7);
  }

  async changePassword(dto: RegistrDto) {
    const hashPassword = await this.helperService.hashData(dto.password);
    return this.prismaService.user.update({
      where: { email: dto.email },
      data: { password: hashPassword },
      select: { ...userInfoSelect.generalInfo },
    });
  }

  async getAllUsers(query: QueryParamsDto) {
    const { skip, take } = query;
    if (!!query.search) {
      return this.searchUsers(query);
    }
    const users = await this.prismaService.user.findMany({
      where: {
        ...userInfoWhere.findInRoles,
      },
      skip,
      take,
      select: {
        ...userInfoSelect.generalInfo,
      },
    });
    if (!users) {
      throw new HttpException(AuthExceptions.USERS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    const totalCount = await this.prismaService.user.count();

    return { totalCount, users };
  }

  async searchUsers(query: QueryParamsDto) {
    const { search, skip, take } = query;
    const users = await this.prismaService.user.findMany({
      where: {
        ...userInfoWhere.findInRoles,
        OR: [
          {
            userInfo: {
              firstName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            userInfo: {
              lastName: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
      skip,
      take,
      select: {
        ...userInfoSelect.generalInfo,
      },
    });
    if (!users) {
      throw new HttpException(AuthExceptions.USERS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    const totalCount = users.length;

    return { totalCount, users };
  }

  async getUsersById(userId: string) {
    const users = await this.prismaService.user.findUnique({
      where: {
        id: userId,
        role: {
          not: Role.ADMIN,
        },
      },
      select: {
        ...userInfoSelect.generalInfo,
      },
    });
    if (!users) {
      throw new HttpException(AuthExceptions.USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return users;
  }

  async changeRole(dto: ChangeRoleDto) {
    const { id, role } = dto;
    await this.getUsersById(id);
    return await this.prismaService.user.update({
      where: { id },
      data: { role },
      select: {
        ...userInfoSelect.generalInfo,
      },
    });
  }

  async upDateUser(dto: UpdateUserDto) {
    const { firstName, lastName, hospital, department, id, status, role } = dto;
    const user = await this.getUsersById(id);

    if (user.role === Role.STUDENT && dto.email !== user.email) {
      await this.updateUserEmail(user.email, dto.email);
    }
    if (role !== user.role && role !== Role.ADMIN) {
      await this.changeRole({ id, role });
    }

    if (user.status !== status) {
      await this.updateUserStatus(id, status);
    }

    const newUserInfo = {
      firstName,
      lastName,
      department,
      hospital,
      grade: dto.grade,
      yearGroup: dto.yearGroup,
    };
    await this.userinfoService.updateOrCreateUser({ dto: newUserInfo, id });
    return await this.getUsersById(id);
  }

  private async updateUserEmail(email: string, newEmail: string) {
    return await this.prismaService.user.update({
      where: { email },
      data: { email: newEmail },
    });
  }

  async updateUserStatus(id: string, status: UserStatus) {
    return await this.prismaService.user.update({
      where: { id },
      data: { status },
      select: {
        ...userInfoSelect.userStatus,
      },
    });
  }

  async updateInvateStatus(id: string, status: ManagerSlotStatus) {
    return await this.prismaService.user.update({
      where: { id },
      data: { invaitedstatus: status },
      select: {
        ...userInfoSelect.userStatus,
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.getUsersById(id);

    if (!user.userInfo) {
      throw new HttpException(AuthExceptions.DO_NOT_DELETE_ACCOUNT, HttpStatus.BAD_REQUEST);
    }

    const deleteToken = this.prismaService.token.delete({
      where: {
        userId: id,
      },
    });

    const deleteUserInfo = this.prismaService.userInfo.delete({
      where: {
        userId: id,
      },
    });

    const deleteUser = this.prismaService.user.delete({
      where: {
        id,
      },
    });

    await this.prismaService.$transaction([deleteToken, deleteUserInfo, deleteUser]);
  }
}
