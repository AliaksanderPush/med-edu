import { Body, Controller, Get, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { QueryParamsDto } from 'src/core/dto/query-param.dto';
import { SlotService } from './slot.service';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/core/guards/user-role.guard';
import { BookingSessionDto } from 'src/session/dto/booking-session.dto';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Get('/all-slots')
  @UseGuards(AccessTokenGuard)
  async fetchAllUser(
    @Query()
    query: QueryParamsDto,
  ) {
    return await this.slotService.getAllSlots(query);
  }

  @Put('/booking')
  @UseGuards(RoleGuard([Role.STUDENT]))
  async bookingSession(@Req() { user }: RequestWithUser, @Body() dto: BookingSessionDto) {
    return await this.slotService.bookingSession(dto.id, user.id);
  }

  @Put('/unsubscribe')
  @UseGuards(RoleGuard([Role.STUDENT]))
  async unsubsribe(@Req() { user }: RequestWithUser, @Body() dto: BookingSessionDto) {
    return await this.slotService.unsubsribe(dto.id, user.id);
  }
}
