import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";



export class RegisterRequestDto{

    @IsString()
    name : string;

    @IsString()
    @Length(10, 12)
    mobileNumber : string;

    @IsEmail({}, {message : "Invalid Email format"})
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}

export class LoginRequesDto{

    @IsEmail()
    email : string;

    @MinLength(6)
    password : string;
}

