import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class User {

    @Prop({
        type: String,
        required: true,
        lowercase: true,
        unique: true
    })
    email: string


    @Prop({
        type: String,
    })
    stripeCustomerId: string
}


export const userSchema = SchemaFactory.createForClass(User)