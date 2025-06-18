import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { createexpenseDto } from "./dto/create-expense.dto";
import { updateExpenseDto } from "./dto/update-expense.dto";




@Controller('expenses')
export class ExpensesController {
    constructor(private ExpensesService:ExpensesService){}

    @Get()
    getAllExpenses(){
        return this.ExpensesService.GetAll()
    }

    @Get(':id')
    getexpenseById(@Param('id') id){
        return this.ExpensesService.GetExpenseById(Number(id))
    }

    @Post()
    createExpense(@Body() createexpenseDto:createexpenseDto){
        const productName = createexpenseDto?.productName
        const category = createexpenseDto?.category
        const price = createexpenseDto?.price
        const quantity = createexpenseDto?.quantity
        return this.ExpensesService.createExpense({productName,category,price,quantity})
    }


    @Delete(':id')
    deleteExpense(@Param('id') id){
        return this.ExpensesService.deleteExpense(Number(id))
    }


    @Put(':id')
    updateExpnese(@Param('id') id, @Body() updateExpenseDto:updateExpenseDto){
        return this.ExpensesService.updateExpense(Number(id), updateExpenseDto)
    }

}
