import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {ChangeUserDto} from "./dto/change-user.dto";
import {UserService} from "./user.service";
import {UserDocument} from "./user.schema";
import {FriendsDocument} from "./friends.schema";

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @Get("/all")
  getAllUsers(): Promise<UserDocument[]> {
    return this.userService.getAllUsers()
  }

  @Get('/friends/:id')
  getUserFriends(@Param('id') id: string): Promise<FriendsDocument[]> {
    return this.userService.getUserFriends(id)
  }

  @Post('/friends/:id')
  addFriend(@Param('id') userId: string, @Body() friendId: string): Promise<FriendsDocument> {
    return this.userService.addFriend(userId, friendId)
  }

  @Put(':id')
  changeUserInfo(@Param('id') id: string, @Body() changeUserData: ChangeUserDto): Promise<UserDocument> {
    return this.userService.changeUser(changeUserData, id)
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.deleteUser(id)
  }
}
