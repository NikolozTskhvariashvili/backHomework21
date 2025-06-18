import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  GetUserById(@Param('id') id) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  CreateUser(@Body() CreateUserDto: CreateUserDto) {
    const firstName = CreateUserDto?.firstName;
    const lastName = CreateUserDto?.lastName;
    const email = CreateUserDto?.email;
    const phoneNumber = CreateUserDto?.phoneNumber;
    const gender = CreateUserDto?.gender;
    return this.usersService.CreateUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    });
  }

  @Delete(':id')
  DeleteUser(@Param('id') id) {
    return this.usersService.DeleteUser(Number(id));
  }

  @Put(':id')
  UpdateUser(@Param('id') id, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.UpdateUser(Number(id), UpdateUserDto);
  }
}
