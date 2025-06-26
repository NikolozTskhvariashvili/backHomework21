import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class HasEmail implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
 
    const email = req.headers['email']
   console.log(email,"email")

    if (!email) {
      req.subscription = false;
      return true;
    }

    if (email) {
      req.subscription = true
      console.log(req.subscription, 'req submsdjbvjbsd');
      return true;
    }

    return true;
  }
}
