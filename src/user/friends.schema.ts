import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, SchemaTypes, Types} from "mongoose";

export type FriendsDocument = Friends & Document

@Schema({timestamps: true})
export class Friends {
  @Prop({type: SchemaTypes.ObjectId, ref: 'User'})
  friend1: Types.ObjectId

  @Prop({type: SchemaTypes.ObjectId, ref: 'User'})
  friend2: Types.ObjectId
}

export const FriendsSchema = SchemaFactory.createForClass(Friends)