import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { isValidObjectId } from "mongoose";
import { Observable } from "rxjs";


export class HasId implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        if(!req.headers['user-id'] && !isValidObjectId(req.headers['user-id'])){
            throw new BadRequestException('userid is not provided')
        }


        return true
    }
}