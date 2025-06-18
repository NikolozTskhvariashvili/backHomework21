import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [UserModule,ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
