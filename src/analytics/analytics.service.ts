import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Expenses } from 'src/expenses/schemas/expenses.schema';
import { Transaction } from 'src/stripe/entities/stripe.entity';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel('user') private Usermodel: Model<User>,
    @InjectModel('expenses') private ExpenseModel: Model<Expenses>,
    @InjectModel('transaction') private TransactionModel: Model<Transaction>,
  ) {}

  async GetAllStats(userId) {
    if (!isValidObjectId(userId)) throw new BadRequestException('invalid id');
    const user = await this.Usermodel.findById(userId);
    if (!user) throw new BadRequestException('iuser not found');
    console.log(user.role, 'user roleeeee');
    if (user.role === 'admin') {
      const users = await this.Usermodel.countDocuments();
      const expenses = await this.ExpenseModel.countDocuments();
      const transactions = await this.Usermodel.countDocuments();

      console.log(
        users,
        expenses,
        transactions,
        'rameeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      );
      return { users, expenses, transactions };
    }

    throw new BadRequestException('only admin can do this');
  }
}
