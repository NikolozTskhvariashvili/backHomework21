import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  // @Prop({
  //     type: String,
  //     required: true,
  //     lowercase: true,
  //     unique: true
  // })
  // email: string

  @Prop({
    type: String,
  })
  stripeCustomerId: string;

  @Prop({
    type: String,
    required: true,
    lowercase: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    required: true,
  })
  gender: string;

  @Prop({
    type: String,
  })
  subscriptionStartDate: string;

  @Prop({
    type: String,
  })
  subscriptionEndDate: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'products',
    default: [],
  })
  products: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'transactions',
    default: [],
  })
  transactions: mongoose.Schema.Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    name: 'expenses',
    default: [],
  })
  expenses: mongoose.Schema.Types.ObjectId[];
}

export const userSchema = SchemaFactory.createForClass(User);
