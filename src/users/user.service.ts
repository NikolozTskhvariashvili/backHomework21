import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      firstName: 'nika',
      lastName: 'tskh',
      email: 'n@gmaio.com',
      phoneNumber: 555555555,
      gender: 'male',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: Number) {
    const user = this.users.find((el) => el.id === id);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  CreateUser(CreateUserDto: CreateUserDto) {
    const { firstName, lastName, email, phoneNumber, gender } = CreateUserDto;
    if (!firstName || !lastName || !email || !phoneNumber || !gender)
      throw new HttpException('firlds are required', HttpStatus.BAD_REQUEST);

    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);
    return 'user create dsuccsesfully';
  }

  DeleteUser(id: Number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('user not found');

    this.users.splice(index, 1);
    return 'user deleted succsesfully';
  }

  UpdateUser(id: Number, UpdateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('user not found');

    const updateReq: UpdateUserDto = {};
    if (UpdateUserDto.firstName) updateReq.firstName = UpdateUserDto.firstName;
    if (UpdateUserDto.lastName) updateReq.lastName = UpdateUserDto.lastName;
    if (UpdateUserDto.email) updateReq.email = UpdateUserDto.email;
    if (UpdateUserDto.phoneNumber)
      updateReq.phoneNumber = UpdateUserDto.phoneNumber;
    if (UpdateUserDto.gender) updateReq.gender = UpdateUserDto.gender;

    this.users[index] = { ...this.users[index], ...updateReq };

    return 'updated succsesfully';
  }
}
