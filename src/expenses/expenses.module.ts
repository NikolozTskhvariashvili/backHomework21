import { Module } from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { ExpensesController } from "./expenses.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ExpensesSchema } from "./schemas/expenses.schema";
import { userSchema } from "src/users/schemas/user.schema";



@Module({
    imports:[
        MongooseModule.forFeature([
            {schema:ExpensesSchema, name:'expenses'},
            {schema:userSchema, name:'user'},
        ])
    ],
    providers:[ExpensesService],
    controllers:[ExpensesController]
})


export class ExpensesModule {}