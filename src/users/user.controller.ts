import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryParamDto } from './dto/query-params.dto';
import { ChangeRole } from './dto/change-role.dto';
import { IsAuth } from 'src/auth/guards/isAuth.guard';

@UseGuards(IsAuth)
@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('change-role')
  changeRole(@Req() req, @Body() changeRole: ChangeRole) {
    return this.usersService.ChangeRole(req.userId, changeRole);
  }

  @Get()
  getAllUsers(@Query() { take, page, email, gender }: UserQueryParamDto) {
    console.log(take, page, 'sdxfbvdsfbbbd');
    return this.usersService.getAllUsers(email, gender);
  }

  @Get(':id')
  GetUserById(@Param('id') id) {
    return this.usersService.getUserById(id);
  }

  // @Post()
  // CreateUser(@Body() CreateUserDto: CreateUserDto) {
  //   const firstName = CreateUserDto?.firstName;
  //   const lastName = CreateUserDto?.lastName;
  //   const email = CreateUserDto?.email;
  //   const phoneNumber = CreateUserDto?.phoneNumber;
  //   const gender = CreateUserDto?.gender;
  //   return this.usersService.CreateUser({
  //     firstName,
  //     lastName,
  //     email,
  //     phoneNumber,
  //     gender,
  //   });
  // }

  @Delete(':id')
  DeleteUser(@Param('id') id) {
    return this.usersService.DeleteUser(id);
  }

  @Put(':id')
  UpdateUser(@Param('id') id, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.UpdateUser(id, UpdateUserDto);
  }

  // @Put('/upgrade-subscription/:id')
  // UpdateSubscription(@Param('id') id,@Body() UpdateUserDto: UpdateUserDto) {
  //   return this.usersService.UpdateSubscription(id,UpdateUserDto);
  // }
}

// 685d4e0bc0807b267ca24043
