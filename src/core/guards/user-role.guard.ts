import { CanActivate, ExecutionContext, HttpException, HttpStatus, mixin, Type } from '@nestjs/common';
import { Role } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { IUserRequest } from 'src/auth/inteface/IUserRequest.interface';
import { AuthExceptions } from 'src/core/constants/auth.constants';

export const RoleGuard = (roles: Role[]): Type<CanActivate> => {
  class RoleGuardMixin extends AccessTokenGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<IUserRequest>();
      const userRole = request.user;

      if (!roles.some((role) => role === userRole.role)) {
        throw new HttpException(AuthExceptions.ACCESS_DENIED, HttpStatus.BAD_REQUEST);
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
};
