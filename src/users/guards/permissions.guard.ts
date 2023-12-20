import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = parseInt(request.headers.authorization);
    const user = this.usersService.findById(userId);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const requiredPermission = this.getRequiredPermission(request.method);
    const hasPermission = user.roles.some((role) =>
      role.permissions.includes(requiredPermission),
    );

    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }

  private getRequiredPermission(method: string): string {
    switch (method) {
      case 'POST':
        return 'CREATE';
      case 'GET':
        return 'VIEW';
      case 'PATCH':
        return 'EDIT';
      case 'DELETE':
        return 'DELETE';
      default:
        return '';
    }
  }
}
