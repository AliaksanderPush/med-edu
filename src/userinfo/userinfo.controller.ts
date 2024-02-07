import { UserinfoService } from './userinfo.service';
import { Body, Controller, Delete, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserInfoDto } from './dto/userinfo.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';

@Controller('userinfo')
export class UserinfoController {
  constructor(private readonly userinfoService: UserinfoService) {}

  @Get('/my')
  @UseGuards(AccessTokenGuard)
  async getUserInfo(@Req() { user }: RequestWithUser) {
    return await this.userinfoService.fetchUserInfo(user.id);
  }

  @Put('/create-update')
  @UseGuards(AccessTokenGuard)
  async createOrUpdateUser(@Req() { user }: RequestWithUser, @Body() dto: UserInfoDto) {
    return await this.userinfoService.updateOrCreateUser({ dto, id: user.id });
  }

  @Delete('/delete')
  @UseGuards(AccessTokenGuard)
  async deleteUserInfo(@Req() { user }: RequestWithUser) {
    await this.userinfoService.deleteUserIndo(user.id);
    return { status: 'ok' };
  }
}
