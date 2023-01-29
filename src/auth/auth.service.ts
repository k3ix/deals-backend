import { Injectable } from '@nestjs/common';
import {RegistrationDto} from "./dto/registration.dto";
import {UserService} from "../user/user.service";
import {LoginDto} from "./dto/login.dto";
import {UserAlreadyExistsException} from "../exceptions/user-already-exists.exception";
import * as bcrypt from 'bcryptjs' ;
import {UserDocument} from "../user/user.schema";
import {JwtService} from "@nestjs/jwt";
import {UserDoesNotExistsException} from "../exceptions/user-does-not-exists.exception";
import {AuthCredentialsWrongException} from "../exceptions/auth-credentials-wrong.exception";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }

  async registration(registrationData: RegistrationDto): Promise<{token: string}> {
    const candidate = await this.userService.getUserByEmail(registrationData.email)
    if (candidate) {
      throw new UserAlreadyExistsException()
    }
    const hashedPassword = await bcrypt.hash(registrationData.password, 10)
    const user = await this.userService.createUser({...registrationData, password: hashedPassword})
    return this.generateToken(user)
  }

  async login(loginData: LoginDto): Promise<{token: string}> {
    const user = await this.validateUser(loginData)
    return this.generateToken(user)
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userService.getAllUsers()
  }

  private async generateToken(user: UserDocument): Promise<{token: string}> {
    const payload = {id: user.id}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(loginData: LoginDto): Promise<UserDocument> {
    let user = await this.userService.getUserByEmail(loginData.usernameOrEmail)
    if (!user) {
      user = await this.userService.getUserByUsername(loginData.usernameOrEmail)
      if (!user) {
        throw new UserDoesNotExistsException()
      }
    }
    const passwordEquals = await bcrypt.compare(loginData.password, user.password)
    if (!passwordEquals) {
      throw new AuthCredentialsWrongException()
    }
    return user
  }
}
