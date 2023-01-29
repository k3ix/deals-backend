import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, SchemaTypes, Types} from "mongoose";
import {User} from "../user/user.schema";

export type DealDocument = Deal & Document

@Schema({timestamps: true})
export class Deal {
  @Prop()
  title: string

  @Prop()
  description: string

  @Prop({type: SchemaTypes.ObjectId, ref: "User"})
  author: Types.ObjectId
}

export const DealSchema = SchemaFactory.createForClass(Deal)