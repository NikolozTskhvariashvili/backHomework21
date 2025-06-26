import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
    stripeCustomerId: string


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
    subscriptionStartDate:string


        @Prop({
        type: String,

    })
    subscriptionEndDate:string
}


export const userSchema = SchemaFactory.createForClass(User)