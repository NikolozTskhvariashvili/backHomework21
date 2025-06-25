import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { transactionSchema } from './entities/stripe.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {schema: transactionSchema, name: 'transaction'},
      {schema: userSchema, name: 'user'},
    ])
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
