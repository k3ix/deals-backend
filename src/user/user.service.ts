import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";
import {Model} from "mongoose";
import {RegistrationDto} from "../auth/dto/registration.dto";
import {ChangeUserDto} from "./dto/change-user.dto";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument> ) {}

  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userRepository.find().exec()
  }

  async createUser(registrationData: RegistrationDto): Promise<UserDocument> {
    const user = new this.userRepository(registrationData)
    return user.save()
  }

  async changeUser(changeUserData: ChangeUserDto, id: string): Promise<UserDocument> {
    return await this.userRepository.findByIdAndUpdate(id, changeUserData, { new: true })
  }

  async deleteUser(id: string): Promise<UserDocument> {
    return await this.userRepository.findByIdAndRemove(id)
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return await this.userRepository.findOne({email: email}).exec()
  }

  async getUserByUsername(username: string): Promise<UserDocument> {
    return await this.userRepository.findOne({username: username}).exec()
  }
}
