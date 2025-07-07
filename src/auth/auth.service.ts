import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, password }: SignUpDto) {
    console.log(email, 'email');
    const existUser = await this.UserModel.findOne({ email });
    if (existUser) throw new BadRequestException('user already exist');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.UserModel.create({
      email,
      password: hashedPassword,
    });

    return { message: 'user cretaed succsesdfully',  newUser };
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.UserModel.findOne({ email });
    if (!existUser) throw new BadRequestException('user not found');

    const isPassEqual = await bcrypt.compare(password, existUser.password);
    if (!isPassEqual) throw new BadRequestException('invalid credentials');

    const payload = {
      id: existUser._id,
    };
    console.log(this.jwtService)
    const token = await this.jwtService.sign(payload, { expiresIn: '1h' });

    return { token };
  }

  async currentUser(userId) {
    const user = await this.UserModel.findById(userId);

    return user;
  }
}
