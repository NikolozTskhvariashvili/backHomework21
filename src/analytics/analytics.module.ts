import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/schemas/user.schema';
import { ExpensesSchema } from 'src/expenses/schemas/expenses.schema';
import { transactionSchema } from 'src/stripe/entities/stripe.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: userSchema,
        name: 'user',
      },
      { schema: ExpensesSchema, name: 'expenses' },
      { schema: transactionSchema, name: 'transaction' },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
