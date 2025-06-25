import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './schemas/user.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {schema:userSchema, name:"user"}
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
