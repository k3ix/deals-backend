import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./user.schema";
import {Friends, FriendsSchema} from "./friends.schema";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Friends.name, schema: FriendsSchema}
    ])
  ],
  exports: [UserService]
})
export class UserModule {}
