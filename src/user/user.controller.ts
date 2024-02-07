import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { UserService } from './user.service';
import { Body, Controller, Get, Patch, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';
import { ChangeRoleDto } from './dto/change-role.dto';
import { RoleGuard } from 'src/core/guards/user-role.guard';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDo } from './dto/update-user-status.dto';
import { QueryParamsDto } from 'src/core/dto/query-param.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AccessTokenGuard)
  async getProfile(@Req() { user }: RequestWithUser) {
    return await this.userService.getMe(user.email);
  }

  @Get('/all-users')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async fetchAllUser(
    @Query()
    query: QueryParamsDto,
  ) {
    return await this.userService.getAllUsers(query);
  }

  @Get('user-id')
  @UseGuards(RoleGuard([Role.ADMIN, Role.MANAGER]))
  async fetchUserById(@Query() guery: { userId: string }) {
    return await this.userService.getUsersById(guery.userId);
  }

  @Put('change-role')
  // @UseGuards(RoleGuard([Role.ADMIN]))
  async changeRole(@Body() dto: ChangeRoleDto) {
    return await this.userService.changeRole(dto);
  }

  @Patch('update')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async updateUser(@Body() dto: UpdateUserDto) {
    return await this.userService.upDateUser(dto);
  }

  @Patch('/change-status')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async changeUserStatus(@Body() { id, status }: UpdateUserStatusDo) {
    return await this.userService.updateUserStatus(id, status);
  }
}
