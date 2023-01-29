import {Body, Controller, Get, Post} from '@nestjs/common';
import {RegistrationDto} from "./dto/registration.dto";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";
import {UserDocument} from "../user/user.schema";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Get()
  getAllUsers(): Promise<UserDocument[]> {
    return this.authService.getAllUsers()
  }

  @Post('register')
  registration(@Body() registrationData: RegistrationDto): Promise<{token: string}> {
    return this.authService.registration(registrationData)
  }

  @Post('login')
  login(@Body() loginData: LoginDto): Promise<{token: string}> {
    console.log(loginData)
    return this.authService.login(loginData)
  }

}
