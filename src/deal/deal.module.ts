import { Module } from '@nestjs/common';
import { DealController } from './deal.controller';
import { DealService } from './deal.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Deal, DealSchema} from "./deal.schema";

@Module({
  controllers: [DealController],
  providers: [DealService],
  imports: [
    MongooseModule.forFeature([{name: Deal.name, schema: DealSchema}])
  ]
})
export class DealModule {}
