import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interface';
import { validMetaRoles } from './role-protected.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
    validMetaRoles(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
