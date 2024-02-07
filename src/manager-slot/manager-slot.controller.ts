import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ManagerSlotService } from './manager-slot.service';
import { RoleGuard } from 'src/core/guards/user-role.guard';
import { Role } from '@prisma/client';
import { CreateManSlotDto } from './dto/create-manslot.dto';
import { AddToManSlotDto } from './dto/add-to-slot.dto';
import { RequestWithUser } from 'src/core/interfaces/user-response.inteface';

@Controller('manager-slot')
export class ManagerSlotController {
  constructor(private readonly managerSlotService: ManagerSlotService) {}

  @Post('/create')
  @UseGuards(RoleGuard([Role.ADMIN]))
  async createManagerSlots(@Body() { managerId, limit }: CreateManSlotDto) {
    return await this.managerSlotService.createManagerSlots(managerId, limit);
  }

  @Post('/add-to-slot')
  @UseGuards(RoleGuard([Role.MANAGER]))
  async invateToSlots(@Req() { user }: RequestWithUser, @Body() { id }: AddToManSlotDto) {
    return await this.managerSlotService.addToManagerSlot(user.id, id);
  }

  @Post('/remove-from-slot')
  @UseGuards(RoleGuard([Role.MANAGER]))
  async deleteFromSlots(@Req() { user }: RequestWithUser, @Body() { id }: AddToManSlotDto) {
    return await this.managerSlotService.deleteFromManagerSlot(user.id, id);
  }

  @Get('/all-students')
  @UseGuards(RoleGuard([Role.MANAGER]))
  async getAllStudentsInManSlots(@Req() { user }: RequestWithUser) {
    return await this.managerSlotService.getManagerSlot(user.id);
  }

  @Get('/slot-users')
  @UseGuards(RoleGuard([Role.MANAGER]))
  async getAllStudentsInSlots(@Req() { user }: RequestWithUser) {
    return await this.managerSlotService.getUsersSlot(user.id);
  }
}
