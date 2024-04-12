import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = request.headers.authorization.split(' ')[1] || undefined
    const checkToken = await this.authService.verifyAccessToken(token);
    
    if (checkToken) {
      const requiredRole = this.reflector.get<string>(
        'role',
        context.getHandler(),
      );
      if (requiredRole) {
       
        const userRole = checkToken.role;
        if (userRole === 0) {
          return true; 
        } else {
          response.status(403).json({ message: 'Bạn không có quyền' }); 
          return false;
        }
      }
      return true; 
    }

    response.status(401).json({ message: 'Unauthorized' }); 
    return false;
  }
}
