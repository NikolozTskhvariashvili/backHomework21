import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<User>) {}

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

  async getAllUsers(email?: string, gender?: string) {
    // return this.users.filter((el) => {
    //   if (gender && gender === 'male') return el.gender === 'male';
    //   if (gender && gender === 'female') return el.gender === 'female';
    //   if (email) return el.email.includes(email);

    //   return this.users;
    // });

    const users = await this.userModel.find().populate({path:'expenses', select:'productName price'})
    
    return users;
  }

  async getUserById(id: string) {
    // const user = this.users.find((el) => el.id === id);
    // if (!user) throw new NotFoundException('user not found');
    // return user;
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');

    const user = await this.userModel.findById(id);

    if (!user) throw new BadRequestException('user not found');
    return user;
  }

  async CreateUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
  }: CreateUserDto) {
    // const { firstName, lastName, email, phoneNumber, gender } = CreateUserDto;
    // if (!firstName || !lastName || !email || !phoneNumber || !gender)
    //   throw new HttpException('firlds are required', HttpStatus.BAD_REQUEST);

    const subscriptionStartDate = new Date();
    const subscriptionEndDate = new Date(subscriptionStartDate);

    subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

    // const lastId = this.users[this.users.length - 1]?.id || 0;

    // const newUser = {
    //   id: lastId + 1,
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   gender,
    //   subscriptionStartDate,
    //   subscriptionEndDate,
    // };
    // this.users.push(newUser);

    const existUser = await this.userModel.findOne({ email });
    if (existUser) throw new BadRequestException('user arlready exist');

    await this.userModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      subscriptionStartDate,
      subscriptionEndDate,
    });

    return 'user create dsuccsesfully';
  }

  // async create({email}: CreateUserDto) {
  //   const newUser = await this.userModel.create({email})
  //   return newUser
  // }

  async DeleteUser(id) {
    // const index = this.users.findIndex((el) => el.id === id);
    // if (index === -1) throw new NotFoundException('user not found');

    // this.users.splice(index, 1);
    // return 'user deleted succsesfully';

    if (!isValidObjectId(id)) throw new BadRequestException('inalid id');
    const user = await this.userModel.findById(id);

    if (!user) throw new BadRequestException('user not found');

    await this.userModel.findByIdAndDelete(id);
    return 'usre deleted succsesfully';
  }

  async UpdateUser(
    id,
    {   email, firstName, gender, lastName, phoneNumber }: UpdateUserDto,
  ) {
    // const index = this.users.findIndex((el) => el.id === id);
    // if (index === -1) throw new NotFoundException('user not found');

    // const updateReq: UpdateUserDto = {};
    // if (UpdateUserDto.firstName) updateReq.firstName = UpdateUserDto.firstName;
    // if (UpdateUserDto.lastName) updateReq.lastName = UpdateUserDto.lastName;
    // if (UpdateUserDto.email) updateReq.email = UpdateUserDto.email;
    // if (UpdateUserDto.phoneNumber)
    //   updateReq.phoneNumber = UpdateUserDto.phoneNumber;
    // if (UpdateUserDto.gender) updateReq.gender = UpdateUserDto.gender;

    // this.users[index] = { ...this.users[index], ...updateReq };

    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');

    const user = await this.userModel.findById(id);

    if (!user) throw new BadRequestException('user not found');


    await this.userModel.findByIdAndUpdate(id, {email,firstName,gender,lastName,phoneNumber})

    
    return 'updated succsesfully';
  }

  async UpdateSubscription(
    id: string,
    { email, firstName, gender, lastName, phoneNumber }: UpdateUserDto,
  ) {
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');

    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('user not found');

    const now = new Date();
    const currentEndDate = new Date(user.subscriptionEndDate);
    const upgradeStart = currentEndDate > now ? currentEndDate : now;

    const newEndDate = new Date(upgradeStart);
    newEndDate.setMonth(newEndDate.getMonth() + 1);

    const updatedsub = await this.userModel.findByIdAndUpdate(id, {
      subscriptionEndDate: newEndDate,
      email,
      firstName,
      gender,
      lastName,
      phoneNumber,
    });

    return { message: 'updated', data: updatedsub };
  }
}
