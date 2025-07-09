import { IsNotEmpty, IsString } from "class-validator";


export class ChangeRole {
    @IsNotEmpty()
    @IsString()
    email: string
}