import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Status } from "src/common/enum/status.enum";

@Schema({ timestamps: true })
export class Transaction {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    })
    userId: mongoose.Schema.Types.ObjectId


    @Prop({
        type: String,
    })
    sessionId: string

    @Prop({
        type: Number,
    })
    amount: number

    @Prop({
        enum: Status,
        default: Status.PENDING
    })
    status: string

      @Prop({
        type:mongoose.Schema.Types.ObjectId,
      ref:'user',
        required:true
      })
      author: mongoose.Schema.Types.ObjectId
}


export const transactionSchema = SchemaFactory.createForClass(Transaction)