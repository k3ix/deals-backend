import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "./user.schema";
import {Model} from "mongoose";
import {RegistrationDto} from "../auth/dto/registration.dto";
import {ChangeUserDto} from "./dto/change-user.dto";
import {Friends, FriendsDocument} from "./friends.schema";


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userRepository: Model<UserDocument>,
    @InjectModel(Friends.name) private friendsRepository: Model<FriendsDocument>
  ) {}

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

  async addFriend(userId: string, friendId: string): Promise<FriendsDocument> {
    const friends = new this.friendsRepository({friend1: userId, friend2: friendId})
    return friends.save()
  }

  async getUserFriends(id: string): Promise<FriendsDocument[]> {
    return await this.friendsRepository.find({friend1: id}).exec()
  }
}
