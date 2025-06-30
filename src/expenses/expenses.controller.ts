import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { createexpenseDto } from "./dto/create-expense.dto";
import { updateExpenseDto } from "./dto/update-expense.dto";
import { ExpenseQueryParamsDto } from "./dto/query-params.dto";
import { CategoryPipe } from "./pipes/category.pipe";
import { HasId } from "src/guards/Has-Id.guard";




@UseGuards(HasId)
@Controller('expenses')
export class ExpensesController {
    constructor(private ExpensesService:ExpensesService){}

    @Get()
    getAllExpenses(@Query() {page, take,priceFrom, priceTo}: ExpenseQueryParamsDto, @Query('category', new CategoryPipe()) category) {
        console.log(page, take ,"page and take")
        console.log(category, "category main")
        console.log(priceFrom, 'pricefrom')
        console.log(typeof priceFrom)
        console.log(priceTo, 'priceto')
        return this.ExpensesService.GetAll(priceFrom, priceTo,page,take)
    }

    @Get(':id')
    getexpenseById(@Param('id') id){
        return this.ExpensesService.GetExpenseById(id)
    }

    @Post()
    createExpense(@Body() createexpenseDto:createexpenseDto, @Headers('user-id') userId){
        const productName = createexpenseDto?.productName
        const category = createexpenseDto?.category
        const price = createexpenseDto?.price
        const quantity = createexpenseDto?.quantity
        return this.ExpensesService.createExpense({productName,category,price,quantity}, userId)
    }


    @Delete(':id')
    deleteExpense(@Param('id') id, @Headers('user-id') userId){
        return this.ExpensesService.deleteExpense(id, userId)
    }


    @Put(':id')
    updateExpnese(@Param('id') id, @Body() updateExpenseDto:updateExpenseDto){
        return this.ExpensesService.updateExpense(Number(id), updateExpenseDto)
    }

}
