import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class IsAuth implements CanActivate {
  constructor(  private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeaders(req.headers);
    console.log(token, 'token');
    if (!token) return false;

    try{
    console.log(this.jwtService)
    const payload = await this.jwtService.verify(token);
    req.userId = payload.id;
    req.userRole = payload.role
    console.log(req.userId, 'userOd');
    console.log(payload, 'paylaod');
    console.log(req.userRole, 'userRoleeeeeeeeeee req')
    }catch(e){
        throw new BadRequestException('token expired')
    }

    return true;
  }

  getTokenFromHeaders(headers) {
    const authorization = headers['authorization'];
    if (!authorization) return null;

    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
