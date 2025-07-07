import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { updateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Expenses } from './schemas/expenses.schema';
import { User } from 'src/users/schemas/user.schema';
import { createexpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('expenses') private ExpensesModel: Model<Expenses>,
    @InjectModel('user') private UserModel: Model<User>,
  ) {}
  expensesArr = [
    {
      id: 1,
      category: 'Electronics',
      productName: 'Laptop',
      quantity: 1,
      price: 1000,
      totalPrice: 1000,
    },
  ];

  async GetAll(
    priceFrom?: number,
    priceTo?: number,
    page: number = 1,
    take: number = 10,
  ) {
    // let result = this.expensesArr;

    // if (priceFrom != null) {
    //   result = result.filter(el => el.price >= priceFrom);
    // }

    // if (priceTo != null) {
    //   result = result.filter(el => el.price <= priceTo);
    // }

    // const start = (page - 1) * take;
    // const end = start + take;

    // const pagination = result.slice(start, end);

    // return pagination;

    const expenses = await this.ExpensesModel.find();
    return expenses;
  }

  async GetExpenseById(id: string) {
    // const expense = this.expensesArr.find((el) => el.id === id);
    // if (!expense) throw new NotFoundException('expense not found');
    // return expense;

    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');

    const expense = await this.ExpensesModel.findById(id);
    if (!expense) throw new BadRequestException('expense \not found');

    return expense;
  }

  async createExpense(
    { productName, quantity, price, category }: createexpenseDto,
    userId: string,
  ) {
    // if (!productName || !quantity || !price || !category)
    //   throw new HttpException('firlds are required', HttpStatus.BAD_REQUEST);

    // const lastId = this.expensesArr[this.expensesArr.length - 1]?.id || 0;
    // const newExpense = {
    //   id: lastId + 1,
    //   productName,
    //   quantity,
    //   price,
    //   category,
    //   totalPrice: quantity * price,
    // };

    // this.expensesArr.push(newExpense);
    // return 'epense created usccsesfully ';

    const existedUser = await this.UserModel.findById(userId);
    if (!existedUser) throw new BadRequestException('user not found');

    const newExpense = await this.ExpensesModel.create({
      productName,
      quantity,
      author: existedUser._id,
      category,
      price,
    });

    await this.UserModel.findByIdAndUpdate(existedUser._id, {
      $push: { expenses: newExpense._id },
    });

    return 'expense creted succsesfgully';
  }

  async deleteExpense(id, userId) {
    // const index = this.expensesArr.findIndex((el) => el.id === id);
    // if (index === -1) throw new NotFoundException('expense not found');

    // this.expensesArr.splice(index, 1);
    // return 'expense deleted succsesfully';

    const existedUser = await this.UserModel.findById(userId);
    if (!existedUser) throw new BadRequestException('user not found');
    
    if (!isValidObjectId(id)) throw new BadRequestException('invalid id');
    const expense = await this.ExpensesModel.findById(id)
    if(expense?._id !== userId) throw new BadRequestException('not ur epense')

    await this.ExpensesModel.findByIdAndDelete(id);

    await this.UserModel.findByIdAndUpdate(userId, { $pull: { expenses: id } });

    return 'epens delete succsesfuly';
  }

  async updateExpense(id: number, updateExpenseDto: updateExpenseDto,userId) {
    const index = this.expensesArr.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('expense not found');

        const expense = await this.ExpensesModel.findById(id)
    if(expense?._id !== userId) throw new BadRequestException('not ur epense')

    const updateReq: updateExpenseDto = {};
    if (updateExpenseDto.category)
      updateReq.category = updateExpenseDto.category;
    if (updateExpenseDto.price) updateReq.price = updateExpenseDto.price;
    if (updateExpenseDto.productName)
      updateReq.productName = updateExpenseDto.productName;
    if (updateExpenseDto.quantity)
      updateReq.quantity = updateExpenseDto.quantity;

    console.log(this.expensesArr[index], 'expenses');

    this.expensesArr[index] = { ...this.expensesArr[index], ...updateReq };
  }
}


//686bc81843959e542b1d8b71