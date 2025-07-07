import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentDto } from './dto/create-stripe.dto';
import { HasId } from 'src/guards/Has-Id.guard';

@UseGuards(HasId)
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  // @Post('create-checkout')
  // createCheckout(@Body() {email, priceId, quantity}: PaymentDto, @Headers('user-id') userId){
  //   return this.stripeService.createPayment(email, priceId, quantity, userId)
  // }

  @Post('/webhook')
  webhook(@Body() rawBody, @Headers() headers){
    return this.stripeService.webHook( rawBody, headers)
  }
}