import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Deal, DealDocument} from "./deal.schema";
import {Model} from "mongoose";
import {CreateDealDto} from "./dto/create-deal.dto";
import {UpdateDealDto} from "./dto/update-deal.dto";

@Injectable()
export class DealService {
  constructor(@InjectModel(Deal.name) private dealRepository: Model<DealDocument>) {}

  async getAllDeals(): Promise<DealDocument[]> {
    return await this.dealRepository.find().exec()
  }

  async createDeal(creationData: CreateDealDto): Promise<DealDocument> {
    const deal = new this.dealRepository(creationData)
    return deal.save()
  }

  async updateDeal(id: string, updateData: UpdateDealDto): Promise<DealDocument> {
    return await this.dealRepository.findByIdAndUpdate(id, updateData, {new: true})
  }

  async deleteDeal(id: string): Promise<DealDocument> {
    return await this.dealRepository.findByIdAndRemove(id)
  }
}
