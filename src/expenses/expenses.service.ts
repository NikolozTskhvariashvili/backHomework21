import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { updateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
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

  GetAll() {
    return this.expensesArr;
  }

  GetExpenseById(id: Number) {
    const expense = this.expensesArr.find((el) => el.id === id);
    if (!expense) throw new NotFoundException('expense not found');
    return expense;
  }

  createExpense({ productName, quantity, price, category }) {
    if (!productName || !quantity || !price || !category)
      throw new HttpException('firlds are required', HttpStatus.BAD_REQUEST);

    const lastId = this.expensesArr[this.expensesArr.length - 1]?.id || 0;
    const newExpense = {
      id: lastId + 1,
      productName,
      quantity,
      price,
      category,
      totalPrice: quantity * price,
    };

    this.expensesArr.push(newExpense);
    return 'epense created usccsesfully ';
  }

  deleteExpense(id: Number) {
    const index = this.expensesArr.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('expense not found');

    this.expensesArr.splice(index, 1);
    return 'expense deleted succsesfully';
  }

  updateExpense(id: number, updateExpenseDto: updateExpenseDto) {
    const index = this.expensesArr.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('expense not found');

    const updateReq:updateExpenseDto = {}
    if(updateExpenseDto.category) updateReq.category = updateExpenseDto.category
    if(updateExpenseDto.price) updateReq.price = updateExpenseDto.price
    if(updateExpenseDto.productName) updateReq.productName = updateExpenseDto.productName
    if(updateExpenseDto.quantity) updateReq.quantity = updateExpenseDto.quantity

    console.log(this.expensesArr[index],"expenses")

     this.expensesArr[index] = {...this.expensesArr[index] , ...updateReq}
  }
}
